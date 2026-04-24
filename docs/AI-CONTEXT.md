# AI session starting context

Paste this at the top of a new AI session (Claude, ChatGPT, etc.) when starting work on rds-2.0 outside of a Copilot Chat inside this repo. Copilot Chat in VS Code/JetBrains inside this repo already gets this context via [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) — use this doc for sessions that don't.

---

## Project

Carleton University's React component library + design system. Two packages:

- **`@cuweb/rds-2.0`** — public, components + tokens + styles. Repo: `github.com/cuweb/rds-2.0`. Local: `~/Develop/personal/rds-2.0`
- **`@cuweb/rds-icons`** — private (GitHub Packages), peer dep. Contains Font Awesome Pro icons as typed React components. Repo: `github.com/cuweb/rds-icons` (private). Local: `~/Develop/personal/rds-icons`

Consumed by: Next.js apps, WordPress block plugins, block themes, hybrid themes, Timber/Twig.

## Tech stack

- Node 22.14.0 (see `.nvmrc`) — pnpm 10.33.0
- Vite library mode (ESM + CJS), TypeScript 6
- Storybook 10 + Vitest + Playwright (a11y tests via axe, threshold `error`)
- SCSS (no Tailwind) + CSS custom properties
- `@troychaplin/component2block` generates design tokens from `c2b.config.json`
- Prettier: `semi: true`, `singleQuote: true`, `printWidth: 100`, `tabWidth: 2`

## Component conventions

```
src/components/Foo/
├── Foo.tsx              # The component
├── Foo.stories.tsx      # Storybook stories
├── index.ts             # Barrel: export { Foo }; export type { FooProps }
└── styles.scss          # BEM + tokens, @use variables
```

- **Class prefix:** `cu-` with BEM modifiers (e.g., `cu-badge--green`, `cu-section--grey`)
- **CSS tokens:** `var(--rds--*)` (e.g., `var(--rds--color-primary)`, `var(--rds--spacing-medium)`)
- **SCSS vars** (only for `@media`): `@use '../../styles/auto/variables' as *;` then `$rds-media-query-{sm,md,lg,xl}` (breakpoints) and `$rds-spacing-*`
- **Imports styles:** `import './styles.scss';` at top of the `.tsx`
- **Prop types:** prefer discriminated unions over optional combos where appropriate
- **Accessibility:** spread ARIA/HTML attrs through `...rest`; default `aria-hidden` for decorative, `role="img"` + `title` for meaningful icons

## Story conventions

- **Title taxonomy:** `Components/Elements/*` (Badge, Button, Icon), `Components/Layout/*` (Main, Section, Column, Aside, Body, Article), `Components/Utilities/*` (LinkProvider)
- **Meta defaults:** always `tags: ['autodocs']`, always `parameters.controls.sort: 'requiredFirst'`
- **argTypes:** add `control: 'select'` or `'inline-radio'` for union-type props so Storybook shows proper dropdowns
- **Render functions** must be **expression-bodied** (`render: (args) => <Foo {...args} />`), not block bodies — the source transform in `.storybook/preview.ts` only unwraps expressions
- **Shared story content:** `src/data/storyContent.tsx` exports `<SingleParagraph />`, `<MultiParagraph count={n} />`, `<SampleList />` — use these, don't inline lorem ipsum
- **Body story:** uses `tags: ['autodocs', '!test']` + `a11y.test: 'off'` to skip axe (it renders a `<body>` inside a `<div>`, which is expected noise)

## Adding a new component — checklist

1. Create `src/components/Foo/Foo.tsx` + `styles.scss` + `index.ts` + `Foo.stories.tsx`
2. Add `export { Foo } from './components/Foo/Foo';` to `src/index.ts`
3. Add `'Foo'` to the `componentNames` array in `vite.config.components.ts`
4. If using icons, import from `@cuweb/rds-icons` (peer dep — already available)
5. Add CHANGELOG entry under `[Unreleased]` with `_Added_` prefix
6. Verify: `pnpm typecheck && pnpm lint && pnpm test:storybook`

## Icons — how they work

- `<Icon name="circle-check" size={24} />` — central API, accepts any of 212 icon names
- Icons live in `@cuweb/rds-icons` (private package). No icons or SVGs exist in rds-2.0 itself
- Default color is `currentColor` (inherits text color)
- See `docs/ICONS.md` and `docs/ICONS-SETUP.md` for details

## Scripts that matter

- `pnpm dev` — Storybook dev (localhost:6006)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint
- `pnpm test:storybook` — Vitest + a11y tests on all stories
- `pnpm build` — full library build (Vite + per-component + SCSS preprocess + c2b)
- `pnpm format` — Prettier write

## Docs structure

```
docs/
├── AI-CONTEXT.md                # This file
├── BRANCH-PROTECTION.md
├── CONSUMING.md                 # Using RDS in projects (Next.js focus)
├── ICONS.md                     # Split-repo architecture rationale
├── ICONS-SETUP.md               # Dev auth setup (GitHub Packages PAT)
├── RELEASING.md                 # Release process (both packages)
└── wordpress/
    ├── README.md                # Decision guide
    ├── blocks-static.md         # save.tsx pattern (icon bakes into post_content)
    ├── blocks-dynamic.md        # save emits icon, render.php wraps
    ├── block-themes.md
    ├── hybrid-themes.md         # cuweb_icon() PHP helper
    └── timber-twig.md           # Twig function/filter
```

CHANGELOG format: Keep a Changelog; entries under `## [Unreleased]` with `_Added_` / `_Changed_` / `_Fixed_` / `_Removed_` / `_Breaking_` prefixes.

## Gotchas already solved

- **Node 22.12 → 22.14**: transitive dep eslint-visitor-keys requires 22.13+
- **FA Pro license:** icons must stay in private `@cuweb/rds-icons`; never ship SVGs from rds-2.0
- **rds-icons GitHub Packages setup:** needs "Internal" visibility in the cuweb org so all consumer repos can install
- **vite-plugin-dts** in rds-icons: use `rollupTypes: false` + `entryRoot: 'src'` + `rootDir: './src'` in tsconfig for correct `dist/` output
- **Color contrast:** badges use black text for yellow/info backgrounds, white for others. `#007c24` for success, `#c41820` for error variant
- **Storybook source transform:** in `preview.ts` unwraps `{ render: (args) => ... }` for cleaner code panel — avoid block-body renders
- **TS 6 side-effect imports:** `declare module '*.scss';` (no body) in `src/scss.d.ts`
- **Pre-push hook:** runs `pnpm test:storybook` — requires Node 22+ to work locally
- **.npmrc gotcha:** project `.npmrc` contains ONLY `@cuweb:registry=...`; auth token lives in user-level `~/.npmrc`

## Companion packages

- `@cuweb/rds-icons` (private) — peer dep for Icon data
- `@troychaplin/component2block` (dev dep) — generates tokens + theme files from `c2b.config.json`
