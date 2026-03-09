# RDS 2.0 — Design System & React Component Library

## Project Overview

A React component library and design system for Carleton University, built with Storybook.js for development, documentation, and visual testing. Published as a public npm package for consumption across university web properties.

**Package name:** `@carletonuniversity/rds-2.0`

---

## Tech Stack Decisions

| Concern         | Choice                 | Rationale                                         |
| --------------- | ---------------------- | ------------------------------------------------- |
| Language        | TypeScript             | Type safety, better DX, self-documenting props    |
| Build tool      | Vite (library mode)    | Fast HMR, native ESM, optimized library builds    |
| Styling         | Sass/SCSS              | Variables, mixins, nesting, mature ecosystem      |
| Design tokens   | SCSS variables & maps  | Centralized theme values compiled at build time   |
| Component dev   | Storybook 8            | Isolated dev, docs, visual testing, a11y addon    |
| Testing         | Vitest + Storybook     | Vite-native unit tests + interaction/visual tests |
| Linting         | ESLint + Prettier      | Code quality + consistent formatting              |
| Package manager | pnpm                   | Fast installs, strict dependency resolution       |
| Node            | 22 LTS                 | Latest long-term support                          |
| Registry        | Public npm (npmjs.com) | Accessible to all consumers                       |
| CI/CD           | GitHub Actions         | Lint, test, build, publish automation             |
| Accessibility   | WCAG 2.1 AA target     | Inclusive design, storybook a11y addon            |

---

## Project Structure

```
rds-2.0/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, test, build on PR
│       └── publish.yml             # Publish to npm on release
├── .storybook/
│   ├── main.ts                     # Storybook config
│   ├── preview.ts                  # Global decorators, parameters
│   └── theme.ts                    # Custom Storybook UI theme
├── docs/
│   └── PLAN.md                     # This file
├── src/
│   ├── index.ts                    # Main entry — re-exports all components
│   ├── tokens/
│   │   ├── _colors.scss            # Color palette variables
│   │   ├── _spacing.scss           # Spacing scale
│   │   ├── _typography.scss        # Font families, sizes, weights
│   │   ├── _breakpoints.scss       # Responsive breakpoints
│   │   └── _index.scss             # Forwards all token partials
│   ├── mixins/
│   │   ├── _responsive.scss        # Media query mixins
│   │   ├── _typography.scss        # Type style mixins
│   │   └── _index.scss             # Forwards all mixins
│   ├── base/
│   │   ├── _reset.scss             # CSS reset / normalize
│   │   ├── _globals.scss           # Global base styles
│   │   └── _index.scss             # Forwards all base styles
│   ├── components/
│   │   └── Typography/
│   │       ├── Heading.tsx          # <Heading> component
│   │       ├── Heading.module.scss  # Heading styles
│   │       ├── Heading.stories.tsx  # Storybook stories
│   │       ├── Heading.test.tsx     # Unit tests
│   │       ├── Paragraph.tsx        # <Paragraph> component
│   │       ├── Paragraph.module.scss
│   │       ├── Paragraph.stories.tsx
│   │       ├── Paragraph.test.tsx
│   │       ├── BlockQuote.tsx
│   │       ├── BlockQuote.module.scss
│   │       ├── BlockQuote.stories.tsx
│   │       ├── BlockQuote.test.tsx
│   │       └── index.ts            # Barrel export for Typography
│   └── styles/
│       └── main.scss               # Aggregates tokens + base for consumers
├── .eslintrc.cjs                   # ESLint config
├── .prettierrc                     # Prettier config
├── .nvmrc                          # Node version (22)
├── tsconfig.json                   # TypeScript config
├── tsconfig.build.json             # TS config for library build (excludes tests/stories)
├── vite.config.ts                  # Vite config (library mode)
├── vitest.config.ts                # Vitest config
├── package.json
└── pnpm-lock.yaml
```

---

## Dependencies to Install

### Core

| Package      | Purpose             |
| ------------ | ------------------- |
| `react`      | Peer dependency     |
| `react-dom`  | Peer dependency     |
| `typescript` | TypeScript compiler |
| `sass`       | SCSS compilation    |

### Build & Dev

| Package                          | Purpose                             |
| -------------------------------- | ----------------------------------- |
| `vite`                           | Build tool & dev server             |
| `@vitejs/plugin-react`           | React fast refresh + JSX transform  |
| `vite-plugin-dts`                | Generate `.d.ts` type declarations  |
| `vite-plugin-css-injected-by-js` | Optional: inject CSS into JS bundle |

### Storybook

| Package                         | Purpose                           |
| ------------------------------- | --------------------------------- |
| `storybook`                     | Core CLI & framework              |
| `@storybook/react-vite`         | React + Vite integration          |
| `@storybook/addon-essentials`   | Docs, controls, actions, viewport |
| `@storybook/addon-a11y`         | Accessibility audit panel         |
| `@storybook/addon-interactions` | Interaction testing in browser    |
| `@storybook/test`               | Test utilities for stories        |
| `@storybook/blocks`             | Doc blocks for MDX docs           |

### Testing

| Package                       | Purpose                     |
| ----------------------------- | --------------------------- |
| `vitest`                      | Unit test runner            |
| `@testing-library/react`      | Component testing utilities |
| `@testing-library/jest-dom`   | DOM assertion matchers      |
| `@testing-library/user-event` | Simulated user interaction  |
| `jsdom`                       | DOM environment for Vitest  |

### Linting & Formatting

| Package                     | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| `eslint`                    | Linter                                            |
| `@eslint/js`                | ESLint recommended rules                          |
| `typescript-eslint`         | TypeScript ESLint integration                     |
| `eslint-plugin-react`       | React-specific lint rules                         |
| `eslint-plugin-react-hooks` | Hooks lint rules                                  |
| `eslint-plugin-jsx-a11y`    | Accessibility lint rules                          |
| `eslint-plugin-storybook`   | Storybook best practices                          |
| `prettier`                  | Code formatter                                    |
| `eslint-config-prettier`    | Disables ESLint rules that conflict with Prettier |

---

## Design Tokens (SCSS)

Tokens will be defined as SCSS variables and maps in `src/tokens/`. These serve as the single source of truth for the design system's visual language.

### Color Palette

```scss
// src/tokens/_colors.scss
$color-primary: #bf112b; // Carleton red
$color-primary-dark: #8c0a20;
$color-secondary: #0d3d6b; // Carleton navy
$color-neutral-100: #f5f5f5;
$color-neutral-200: #e0e0e0;
$color-neutral-700: #4a4a4a;
$color-neutral-900: #1a1a1a;
$color-white: #ffffff;
$color-black: #000000;
// ... extend as needed
```

### Spacing Scale

```scss
// src/tokens/_spacing.scss
$spacing-xs: 0.25rem; // 4px
$spacing-sm: 0.5rem; // 8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px
$spacing-3xl: 4rem; // 64px
```

### Typography Scale

```scss
// src/tokens/_typography.scss
$font-family-base: "Open Sans", sans-serif;
$font-family-heading: "Open Sans", sans-serif;

$font-size-xs: 0.75rem; // 12px
$font-size-sm: 0.875rem; // 14px
$font-size-base: 1rem; // 16px
$font-size-lg: 1.125rem; // 18px
$font-size-xl: 1.25rem; // 20px
$font-size-2xl: 1.5rem; // 24px
$font-size-3xl: 2rem; // 32px
$font-size-4xl: 2.5rem; // 40px
$font-size-5xl: 3rem; // 48px

$font-weight-regular: 400;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$line-height-tight: 1.2;
$line-height-base: 1.5;
$line-height-loose: 1.75;
```

---

## Initial Component Scope — Typography

Starting with a focused set of typography components to establish patterns, then expand.

### Components

| Component      | Props                                                       | Element    |
| -------------- | ----------------------------------------------------------- | ---------- |
| `<Heading>`    | `level` (1–6), `as` (override tag), `children`, `className` | h1–h6      |
| `<Paragraph>`  | `size` (sm, md, lg), `children`, `className`                | p          |
| `<BlockQuote>` | `cite`, `children`, `className`                             | blockquote |

### Conventions

- Each component gets its own `.tsx`, `.module.scss`, `.stories.tsx`, and `.test.tsx`
- All components export named exports (no default exports)
- Props interfaces are exported alongside components
- Components use `forwardRef` for DOM ref forwarding
- SCSS modules import from `../../tokens/index` and `../../mixins/index`

---

## Vite Library Build

The library will be built in Vite's **library mode**, producing both ESM and CJS outputs with type declarations.

```ts
// vite.config.ts (simplified)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], rollupTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
```

### Package.json exports

```json
{
  "name": "@carletonuniversity/rds-2.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

---

## Storybook Configuration

Storybook 8 with the React-Vite builder. Configured with:

- **Autodocs** — auto-generated docs from component props and JSDoc
- **a11y addon** — accessibility checks on every story
- **Interactions addon** — play functions for interaction tests
- **Custom theme** — branded Storybook UI matching Carleton identity

---

## Testing Strategy

| Layer             | Tool                        | What it covers                      |
| ----------------- | --------------------------- | ----------------------------------- |
| Unit tests        | Vitest + Testing Library    | Props, rendering, conditional logic |
| Accessibility     | Storybook a11y addon + axe  | WCAG violations per story           |
| Interaction tests | Storybook play functions    | User flows within stories           |
| Visual regression | (Future) Chromatic or Percy | Screenshot diffing                  |

### Test file co-location

Tests live next to their components (`Component.test.tsx`) for easy discovery and maintenance.

---

## CI/CD Pipeline (GitHub Actions)

### `ci.yml` — Runs on every PR

1. Checkout + pnpm install (cached)
2. `pnpm lint` — ESLint + Prettier check
3. `pnpm typecheck` — `tsc --noEmit`
4. `pnpm test` — Vitest
5. `pnpm build` — Verify library builds cleanly
6. `pnpm build-storybook` — Verify Storybook builds

### `publish.yml` — Runs on GitHub Release

1. All CI checks pass
2. `pnpm build`
3. `npm publish --access public`

---

## Scripts (package.json)

```json
{
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "vite build",
    "build-storybook": "storybook build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write 'src/**/*.{ts,tsx,scss}'",
    "format:check": "prettier --check 'src/**/*.{ts,tsx,scss}'",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Implementation Phases

### Phase 1 — Project Scaffolding

- [ ] Initialize pnpm project
- [ ] Install all dependencies
- [ ] Configure TypeScript, Vite, Vitest
- [ ] Configure ESLint + Prettier
- [ ] Initialize Storybook
- [ ] Set up SCSS tokens and base styles
- [ ] Create `.nvmrc`, `.gitignore`, editor configs

### Phase 2 — Typography Components

- [ ] Implement `<Heading>` component + stories + tests
- [ ] Implement `<Paragraph>` component + stories + tests
- [ ] Implement `<BlockQuote>` component + stories + tests
- [ ] Verify Storybook autodocs generation
- [ ] Run a11y checks on all stories

### Phase 3 — Build & Publish Setup

- [ ] Configure Vite library build output
- [ ] Verify package exports (ESM, CJS, types, CSS)
- [ ] Test local consumption via `pnpm link`
- [ ] Set up GitHub Actions CI workflow
- [ ] Set up GitHub Actions publish workflow
- [ ] Publish initial version to npm

### Phase 4 — Expand (Future)

- [ ] Add more component categories (forms, layout, navigation)
- [ ] Add visual regression testing (Chromatic/Percy)
- [ ] Add changelog automation (changesets)
- [ ] Build documentation site from Storybook

---

## Install Commands (Quick Reference)

```bash
# Initialize project
pnpm init

# Core
pnpm add -D react react-dom typescript sass

# Vite
pnpm add -D vite @vitejs/plugin-react vite-plugin-dts

# Storybook (use the CLI to bootstrap)
pnpm dlx storybook@latest init --builder vite
pnpm add -D @storybook/addon-a11y

# Testing
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Linting & formatting
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-storybook prettier eslint-config-prettier
```

> **Note:** `storybook init` will install most Storybook packages automatically. The a11y addon is added separately.
