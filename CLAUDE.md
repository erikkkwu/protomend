# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Reheader — an HTTP request/response header modifier built with
**WXT + Vue 3 + TypeScript**. Scope is deliberately limited to header
modification: profiles of request/response header rules plus global exclude
filters. Redirects, cookie tooling, and on-page tools are out of scope.
`README.md` describes the project.

## Commands

```bash
pnpm install         # runs `wxt prepare` (generates .wxt/ types — needed before compile)
pnpm dev             # Chrome, with HMR (launches its own Chrome; uses --remote-debugging-pipe)
pnpm build           # production build to .output/chrome-mv3/
pnpm compile         # type-check only (vue-tsc --noEmit)
pnpm lint            # ESLint (@antfu/eslint-config) — `pnpm lint:fix` auto-fixes
pnpm test            # vitest unit tests (core/ + composables/)
pnpm test -t "allow rules"     # run tests matching a name
pnpm test core/dnr.test.ts     # run a single test file
```

`pnpm compile` type-checks **including test files**, so a broken test type fails
compile. Run `lint`, `compile`, and `test` before considering a change done.

## Architecture

Two deliberate layers — keep logic out of `.vue` files:

- **`core/`** — pure, framework-free TypeScript. All behavior lives here and is unit-tested.
- **`entrypoints/` + `components/` + `composables/`** — thin Vue/WXT wiring. WXT generates
  the manifest from the `entrypoints/` directory layout (background, popup/, options/);
  permissions/host_permissions are declared in `wxt.config.ts`.

**VueUse first.** Before hand-rolling a composable or browser-API wrapper, check whether
VueUse covers it (`@vueuse/core` / `@vueuse/integrations` are already dependencies — e.g.
`useClipboard`, `useFileDialog`, `refAutoReset`, `useRafFn`, `useScroll`, `useFuse` are all
in use). Hand-roll only when VueUse has no fit (e.g. the one-shot JSON download in
`SettingsModal.vue`), and say why in the PR.

### The rule-compilation model (`core/dnr.ts`)

`compileConfig(config)` turns the **selected, enabled** profile into
`chrome.declarativeNetRequest` **session rules**:

- Request/response header rules → `modifyHeaders` actions (`set` / `remove`),
  priority 1.
- **Global exclude filters** are NOT expressed as a DNR exclusion field (DNR has no
  regex-based exclusion — `excluded*Domains` only accept domains). Instead, when a profile
  has `useGlobalFilters` on, each exclude pattern becomes a higher-priority (`allow`, priority 100) rule. A matching request hits the `allow` rule first and is exempted from all
  modifications. This is the canonical DNR pattern for regex exceptions — preserve it.

The background (`entrypoints/background.ts`) is the only caller: it recompiles and
`updateSessionRules` on every storage change, and sets the toolbar badge.

### State & storage (`core/storage.ts` + `composables/useConfig.ts`)

Single storage item `local:config` (WXT `storage.defineItem`, fallback `createConfig()`).
`getConfig`/`watchConfig` run every value through `normalizeConfig` — this **coerces
array-like objects (`{0:…}`) back into real arrays**, because `chrome.storage` can
round-trip arrays into index-keyed objects. Don't remove this normalization.

`useConfig` is the reactive bridge and has a **non-obvious correctness constraint**:
it holds a single `reactive` config, merges external changes in-place with `Object.assign`
(never replaces the object — that would detach `v-model` bindings), and guards the
write-back watcher with a `suppressWrite` flag that is only cleared _after_ `await nextTick()`
(Vue's deep watcher flushes asynchronously; a synchronous flag reset does not suppress it).
Changing this flow tends to reintroduce an edit↔reload loop — the `useConfig.test.ts`
cases are the regression guard.

### Model conventions (`core/model.ts`)

Each model type declares its fields once in a `FieldSpec` (fallback + coercion per
field); the `create*` factories and `normalize*` gates are derived from it, so adding a
field means updating the interface and adding one spec row — nothing else. All factories
skip explicit `undefined` overrides. Cross-field invariants (empty-profiles fallback,
`selectedProfileIndex` clamp) live as explicit steps in `normalizeConfig`, not in the
spec. Header-rule items intentionally pass through `toArray` without per-item
normalization — don't add it without checking storage round-trip expectations.

## Styling

Tailwind v4 via `@tailwindcss/vite` (registered in `wxt.config.ts`). Theme tokens
(colors, fonts, the `switch`/`no-scrollbar` utilities) are defined in `assets/tailwind.css`
`@theme` — use these tokens (`bg-panel`, `text-signal`, etc.), not ad-hoc colors. Fonts are
**self-hosted** in `public/fonts/` (no remote CDN — MV3/CSP + offline reasons); keep it that way.

## Testing infra

Tests don't load the full WXT Vitest plugin. `vitest.config.ts` aliases `#imports` →
`test/imports-shim.ts` and `@` → repo root; `test/setup.ts` installs `fakeBrowser` as the
global `browser`/`chrome` and resets it per test. To test code that reads storage, use
`fakeBrowser` (in-memory) rather than mocking. Vue component behavior is verified against
the built bundle by driving it in a browser, not via component-mount tests.
