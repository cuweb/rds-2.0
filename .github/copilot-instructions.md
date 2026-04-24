# Copilot Instructions

## Project

**Raven Design System (RDS) 2.0** — Carleton University's React component library. Package: `@cuweb/rds-2.0`. Paired with `@cuweb/rds-icons` (private peer dep) for Font Awesome Pro icons.

Consumed by: Next.js apps, WordPress block plugins, block themes, hybrid themes, Timber/Twig. See `docs/AI-CONTEXT.md` for deeper context and `docs/wordpress/` for integration patterns.

## Tech Stack

- Vite library mode (ESM + CJS), TypeScript 6, pnpm
- React 18 components
- SCSS + CSS custom properties (no Tailwind)
- Storybook 10 with `@storybook/react-vite`
- Vitest + Playwright (a11y tests via axe — failures block CI)
- `@troychaplin/component2block` generates tokens from `c2b.config.json` → `src/styles/auto/tokens.css` + `_variables.scss`

## Key Conventions

- Class prefix: `cu-` with BEM (e.g. `cu-badge--green`)
- CSS token prefix: `var(--rds--*)` (e.g. `var(--rds--color-primary)`)
- SCSS variables (only for `@media` queries, since CSS custom properties don't work in media queries): `@use '../../styles/auto/variables' as *;` then `$rds-media-query-{sm,md,lg,xl}` for breakpoints
- Components exported from `src/index.ts`; new components also added to `vite.config.components.ts` `componentNames` array
- Component styles: `styles.scss` imported directly in the component TSX file
- Shared prop-to-class mappings: `src/utils/propClasses.tsx`
- WordPress layout classes: `.alignfull`, `.alignwide`, `.has-global-padding`, `.is-layout-constrained`

## Code Style

- Automatic JSX transform — do not import React unless using its APIs directly
- Avoid unnecessary fragments (`<></>`) when a single root element exists
- Use `undefined` instead of empty strings for conditional `className` to avoid empty `class=""` attributes
- Prefer early returns over ternaries for branching render logic
- No dead commented-out code — remove it or implement it
- Don't add docstrings, comments, or type annotations to code you didn't change

## Icons

Icons are a peer dependency from `@cuweb/rds-icons` (private package).

```tsx
// Central component (preferred for most usage)
import { Icon } from '@cuweb/rds-2.0';
<Icon name="circle-check" size={24} />

// Named imports (better tree-shaking for known names)
import { CircleCheckIcon } from '@cuweb/rds-icons';

// For CMS/Gutenberg select controls
import { iconList } from '@cuweb/rds-icons';
```

Never add SVG files to rds-2.0 itself. FA Pro licensing requires icons stay in the private package. See `docs/ICONS.md`.

## Changelog

- [Keep a Changelog](https://keepachangelog.com/) format in `CHANGELOG.mdx`
- Entries under `## [Unreleased]`
- Prefix with keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`
- Use `_Breaking_` alongside a major version bump

## Verification Before Committing

- `pnpm typecheck` — clean
- `pnpm lint` — clean
- `pnpm test:storybook` — all a11y checks pass (only runs on Node 22+)
