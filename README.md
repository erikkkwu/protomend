# Protomend

An HTTP request/response **header modifier** — built with
**WXT + Vue 3 + TypeScript**. Scope is intentionally limited to core header
modification: switchable profiles of request/response header rules, plus global
exclude filters that exempt matching URLs.

## Why this is maintainable

- **Framework-free core.** All behavior lives in [`core/`](core/) as pure
  TypeScript: the domain model, the `declarativeNetRequest` compiler, storage, and
  JSON import/export. It has unit tests and no Vue/DOM dependency.
- **Thin entry points.** [`entrypoints/`](entrypoints/) holds only the wiring:
  `background.ts`, and `popup/` + `options/` Vue apps. WXT generates the manifest
  from this directory structure.
- **One editor, two surfaces.** Popup and options render the same
  [`ProfileEditor.vue`](components/ProfileEditor.vue); they differ only in layout
  (`fullscreen` prop).

## Layout

```
core/                 pure logic (tested, no framework)
  model.ts            Profile / HeaderRule / Filter types + factories
  dnr.ts              compileConfig() → chrome.declarativeNetRequest rules
  storage.ts          typed wrapper over WXT storage
  profileJson.ts      import / export the whole config as JSON
  *.test.ts           vitest unit tests
composables/
  useConfig.ts        reactive, two-way-synced config for Vue
  useHeaderAutocomplete.ts / usePillScroller.ts
components/
  ProfileEditor.vue   the shared editor
  HeaderRuleList.vue  reusable rule table (request/response)
  HeaderNameInput.vue header-name field with autocomplete
  SettingsModal.vue   global exclude filters + JSON import/export
entrypoints/
  background.ts       compiles the selected profile → session rules; badge
  popup/              toolbar UI
  options/            full-page UI
public/_locales/en/   i18n name + description
wxt.config.ts         manifest: permissions + host_permissions
```

## Develop

```bash
pnpm install         # runs `wxt prepare` (generates .wxt/ types)
pnpm dev             # Chrome, with HMR
pnpm dev:firefox     # Firefox
```

## Build & test

```bash
pnpm lint            # ESLint (@antfu/eslint-config)
pnpm compile         # type-check (vue-tsc)
pnpm test            # vitest unit tests (core/ + composables/)
pnpm test:e2e        # playwright-bdd scenarios against the built extension
pnpm build           # production build to .output/
pnpm zip             # packaged .zip for store upload
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contributor guide.

Load the unpacked build from `.output/chrome-mv3/` via
`chrome://extensions → Load unpacked`.

## Data model (summary)

A **Config** holds a list of **Profiles** (one selected) plus a set of global
**exclude URL filters**. A **Profile** has a title, an enabled flag, a
`useGlobalFilters` toggle, and two rule lists — request headers and response
headers. The background compiles the selected profile into
`declarativeNetRequest` **session rules**: header rules become `modifyHeaders`
(`set` / `remove`). When a profile opts into filters, each global
exclude pattern becomes a higher-priority `allow` rule, exempting matching
requests from all modifications.
