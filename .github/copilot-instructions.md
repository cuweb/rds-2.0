# Copilot Instructions

## Project Overview

This is **Raven Design System (RDS) 2.0** — Carleton University's React component library and design system. Package: `@carletonuniversity/rds-2.0`.

## Tech Stack

- **Build:** Vite library mode (ESM + CJS), TypeScript, pnpm
- **UI:** React 18 components
- **Styles:** SCSS + CSS custom properties (no Tailwind)
- **Docs:** Storybook 10 with `@storybook/react-vite`
- **Testing:** Vitest + Testing Library + Playwright (Storybook interaction tests)
- **Tokens:** `@troychaplin/component2block` generates CSS custom properties and WordPress `theme.json` from `c2b.config.json`

## Key Conventions

- CSS class prefix: `cu-` with BEM naming (e.g. `cu-section--grey`)
- Design token prefix: `--rds--` (e.g. `var(--rds--color-primary)`)
- No Tailwind utility classes — use design tokens via CSS custom properties
- Components are exported from `src/index.ts`
- Component styles are `.scss` files imported directly in the component TSX file
- SCSS mixins (`above()`, `below()`) are globally available — no import needed in `.scss` files
- WordPress layout compatibility classes: `.alignfull`, `.alignwide`, `.has-global-padding`, `.is-layout-constrained`
- Shared prop-to-class mappings live in `src/utils/propClasses.tsx`

## Code Style

- Use the automatic JSX transform — do not import React unless using React APIs directly
- Avoid unnecessary fragments (`<></>`) when a single root element exists
- Use `undefined` instead of empty strings for conditional `className` to avoid empty `class=""` attributes
- Prefer early returns over ternaries for branching render logic
- No dead commented-out code — remove it or implement it
- Don't add docstrings, comments, or type annotations to code you didn't change

## Changelog

- Follows [Keep a Changelog](https://keepachangelog.com/) format in `CHANGELOG.mdx`
- Prefix entries with keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`
- New work goes under `## [Unreleased]`
