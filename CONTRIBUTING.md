# Contributing to Protomend

Thanks for your interest in contributing! This document covers everything you
need to get a change from idea to merged PR.

## Scope

Protomend is deliberately limited to **HTTP header modification**: profiles of
request/response header rules plus global exclude filters. Redirects, cookie
tooling, and on-page tools are out of scope — please open an issue to discuss
before building a feature outside this scope.

## Setup

Prerequisites: Node.js >= 20 and [pnpm](https://pnpm.io) (the repo pins the
version via the `packageManager` field — `corepack enable` handles it).

```bash
pnpm install     # also runs `wxt prepare` (generates .wxt/ types) and installs git hooks
pnpm dev         # Chrome with HMR (launches its own Chrome instance)
```

## Project layout

- **`core/`** — pure, framework-free TypeScript. All behavior lives here and is
  unit-tested. No Vue/DOM imports.
- **`composables/` + `components/` + `entrypoints/`** — thin Vue/WXT wiring.
  WXT generates the manifest from the `entrypoints/` directory layout.

Keep logic out of `.vue` files. Before hand-rolling a composable or
browser-API wrapper, check whether [VueUse](https://vueuse.org) covers it —
hand-roll only when it doesn't, and say why in the PR.

## Checks

All of these must pass before a PR is merged (CI runs them too):

```bash
pnpm lint        # ESLint (@antfu/eslint-config) — `pnpm lint:fix` auto-fixes
pnpm compile     # type-check, including test files (vue-tsc)
pnpm test        # vitest unit tests (core/ + composables/)
pnpm test:e2e    # playwright-bdd scenarios against the built extension
```

A pre-commit hook runs `lint-staged` (ESLint with `--fix` on staged files)
automatically.

## Testing conventions

- New behavior in `core/` or `composables/` needs unit tests.
- To test code that reads extension storage, use the in-memory `fakeBrowser`
  (installed globally in `test/setup.ts`) rather than mocking.
- Vue component behavior is verified end-to-end against the built bundle
  (`e2e/`), not via component-mount tests.

## Commit messages

Commits follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
type(scope): description
```

- Examples: `feat(profile): add duplicate action`, `fix(dnr): cover main-frame requests`.
- Breaking changes: append `!` after the type/scope, or add a `BREAKING CHANGE:` footer.
- `CHANGELOG.md` is generated from these messages with
  [changelogen](https://github.com/unjs/changelogen), so pick the type accurately —
  `feat`/`fix` end up in the changelog; use `chore`/`docs`/`refactor`/`test` where they apply.

Maintainers cut releases with `pnpm release` (runs the checks, bumps the version,
updates `CHANGELOG.md`, then commits, tags, and pushes).

## Pull requests

- Keep diffs small and focused; unrelated refactors belong in separate PRs.
- Match the existing code style — the linter enforces most of it.
- Describe **what** changed and **why**; link the related issue if one exists.
