# AI session starting context

Paste the snippet below into a new AI session (Claude, ChatGPT, etc.) when working on rds-2.0 outside of a Copilot Chat inside this repo.

Copilot Chat in VS Code / JetBrains gets this context automatically via [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) — use this doc only for sessions that don't.

> The single source of truth for conventions is [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) plus [`.github/instructions/*.md`](../../.github/instructions/). This doc is a one-shot bootstrap pointer; the canonical files are loaded by Copilot per file glob.

## Snippet to paste

```text
You are working on @cuweb/rds-2.0 — Carleton University's React component
library and design system. Two packages are involved:

- @cuweb/rds-2.0 (this repo, public): components + tokens + styles
  Location: ~/Develop/personal/rds-2.0
- @cuweb/rds-icons (peer dep, private GitHub Packages): FA Pro icon
  components. Location: ~/Develop/personal/rds-icons

Consumed by: Next.js apps, WordPress block plugins, block themes, hybrid
themes, Timber/Twig.

Tech stack:
- Node 22.14, pnpm 10
- Vite library mode (ESM + CJS), TypeScript 6
- React 18, SCSS + CSS custom properties (no Tailwind)
- Storybook 10 + Vitest + Playwright; axe a11y at threshold "error"
- @troychaplin/component2block generates tokens from c2b.config.json

Conventions are in:
- .github/copilot-instructions.md (project-wide)
- .github/instructions/components.instructions.md (src/components/**/*.tsx)
- .github/instructions/stories.instructions.md (**/*.stories.tsx)
- .github/instructions/styles.instructions.md (**/*.scss)

Architecture and the two-package icon model:
docs/contributing/architecture.md

Component / story / SCSS conventions overview:
docs/contributing/conventions.md
```

## Why two-package model

Font Awesome Pro license requires Carleton to keep Pro Icons inside an auth-gated package. See [architecture.md → Two-package icon model](architecture.md#two-package-icon-model) for the full rationale.

## Where to find things

| Looking for | Read |
|---|---|
| File-by-file conventions Copilot enforces | [`.github/instructions/`](../../.github/instructions/) |
| Build pipeline, token flow, Storybook setup | [architecture.md](architecture.md) |
| Adding a new component | [conventions.md](conventions.md#adding-a-new-component) |
| Running tests / a11y / lint | [testing.md](testing.md) |
| Local environment setup | [local-setup.md](local-setup.md) |
| Releasing | [../maintenance/releasing.md](../maintenance/releasing.md) |
| Consumer-facing docs | [../consumers/](../consumers/) |

## Gotchas worth knowing

- **Node 22.14 specifically** — `eslint-visitor-keys` (transitive) requires 22.13+. Earlier minors fail on install.
- **No SVGs ship from this repo** — FA Pro license requires icons stay in `@cuweb/rds-icons`. Never add `.svg` files here.
- **Storybook source transform** — [`.storybook/preview.ts`](../../.storybook/preview.ts) unwraps `{ render: (args) => ... }` for the docs code panel. Only **expression-bodied** render functions work; block bodies break the transform.
- **CSS custom properties don't work in `@media`** — for breakpoint values use SCSS variables from `src/styles/auto/_variables.scss` (`$rds-media-query-{sm,md,lg,xl}`).
- **TS 6 side-effect imports** — `declare module '*.scss';` (no body) in [`src/scss.d.ts`](../../src/scss.d.ts).
- **`.npmrc` split** — project `.npmrc` has only `@cuweb:registry=...`; the auth `_authToken` lives in user-level `~/.npmrc`.
