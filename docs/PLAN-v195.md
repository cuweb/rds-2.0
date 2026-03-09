# Design System & React Component Library — Project Plan

## Overview

A general-purpose, multi-product React component library and design system, built with Storybook, authored in strict TypeScript, styled with Sass, and published to the public npm registry.

---

## Tech Stack Decisions

| Concern | Choice | Rationale |
|---|---|---|
| Framework | React 18 | Broad ecosystem fit for multi-product use |
| Language | TypeScript (strict) | Full type safety; consumers get excellent IntelliSense |
| Styling | Sass (SCSS modules per component) | Zero runtime cost; no JS-in-CSS overhead; portable to any stack |
| Design tokens | CSS custom properties + Sass variables | Tokens live in CSS, usable outside React |
| Bundler | Vite (library mode) | Fast DX; clean ESM + CJS dual output |
| Documentation | Storybook 8 | Industry standard; co-locates docs with components |
| Storybook add-ons | `@storybook/addon-a11y`, `@storybook/addon-docs` | Accessibility auditing + auto-generated MDX docs |
| Package registry | npm (public) | Widest reach for multi-product consumption |
| Node package manager | pnpm | Strict hoisting; disk-efficient for monorepo potential |

---

## Project Structure

```
my-design-system/
├── .storybook/
│   ├── main.ts               # Storybook config, addons, framework
│   └── preview.ts            # Global decorators, Sass imports, a11y setup
│
├── src/
│   ├── tokens/
│   │   ├── _colors.scss      # Color palette variables
│   │   ├── _typography.scss  # Font stacks, scale, weights
│   │   ├── _spacing.scss     # Spacing scale
│   │   ├── _motion.scss      # Easing curves, durations
│   │   └── index.scss        # Barrel — imports all tokens
│   │
│   ├── components/
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.module.scss
│   │       ├── Button.stories.tsx
│   │       └── index.ts
│   │
│   ├── hooks/                # Shared utility hooks
│   ├── utils/                # Shared helpers
│   └── index.ts              # Public API barrel export
│
├── dist/                     # Vite build output (gitignored)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PLAN.md
```

Each component is self-contained in its own folder with its styles, stories, and a clean `index.ts` re-export.

---

## Installation Steps

### 1. Initialise the project

```bash
pnpm init
```

### 2. Install React + TypeScript

```bash
pnpm add react react-dom
pnpm add -D typescript @types/react @types/react-dom
```

### 3. Install Vite (library mode bundler)

```bash
pnpm add -D vite @vitejs/plugin-react vite-plugin-dts
```

`vite-plugin-dts` auto-generates `.d.ts` type declaration files on build.

### 4. Install Sass

```bash
pnpm add -D sass
```

### 5. Install Storybook 8

Use the Storybook CLI to scaffold config automatically:

```bash
pnpm dlx storybook@latest init --type react
```

This installs the core packages and creates `.storybook/main.ts` and `preview.ts`.

### 6. Install Storybook add-ons

Both are typically included by the Storybook init for React. Verify they are present in `.storybook/main.ts`, and if not:

```bash
pnpm add -D @storybook/addon-a11y @storybook/addon-docs
```

---

## Key Config Files

### `vite.config.ts` (library mode)

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
  },
});
```

React and ReactDOM are externalised — consumers bring their own.

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "declaration": true,
    "declarationDir": "dist/types",
    "outDir": "dist",
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### `package.json` (key fields)

```json
{
  "name": "@your-scope/design-system",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.cjs.js",
  "module": "dist/index.es.js",
  "types": "dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js"
    },
    "./styles": "./dist/styles.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": ">=17",
    "react-dom": ">=17"
  },
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "vite build",
    "build-storybook": "storybook build",
    "prepublishOnly": "pnpm build"
  }
}
```

---

## Design Token Strategy

Tokens live in `src/tokens/` as Sass variables **and** CSS custom properties simultaneously:

```scss
// src/tokens/_colors.scss
$color-primary-500: #3b82f6;
$color-neutral-900: #0f172a;

:root {
  --color-primary-500: #{$color-primary-500};
  --color-neutral-900: #{$color-neutral-900};
}
```

This means:
- Sass files can reference `$color-primary-500` at build time
- Consumers can override tokens at runtime via CSS variables
- The system is usable outside of React (plain HTML, other frameworks)

---

## Component Authoring Pattern

```tsx
// Button.tsx
import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
```

```ts
// index.ts
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';
```

---

## Story Authoring Pattern

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],       // enables @storybook/addon-docs auto-generation
  argTypes: {
    variant: { control: 'select' },
    size: { control: 'select' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Click me' },
};
```

The `tags: ['autodocs']` flag triggers auto-generated documentation pages via `@storybook/addon-docs` with no extra config.

---

## npm Publishing Workflow

```bash
# 1. Log in
npm login

# 2. Bump version (follows semver)
pnpm version patch   # or minor / major

# 3. Build + publish (prepublishOnly runs vite build automatically)
pnpm publish --access public
```

If using a scoped package (`@your-scope/design-system`), `--access public` is required the first time to make it publicly accessible.

---

## Phased Build-Out

### Phase 1 — Scaffold & Foundations
- [ ] Init project, install all dependencies
- [ ] Configure Vite library mode, tsconfig, pnpm scripts
- [ ] Set up Storybook with a11y + docs addons
- [ ] Define design tokens (colours, typography, spacing, motion)
- [ ] Create a `Welcome` or `Introduction` MDX story as the Storybook landing page

### Phase 2 — Core Primitive Components
- [ ] Button (variant, size, disabled, loading states)
- [ ] Input + Label + HelperText
- [ ] Checkbox / Radio
- [ ] Select
- [ ] Badge / Tag
- [ ] Icon wrapper

### Phase 3 — Composite Components
- [ ] Card
- [ ] Modal / Dialog
- [ ] Toast / Notification
- [ ] Tooltip
- [ ] Dropdown Menu

### Phase 4 — Polish & Publish
- [ ] Review all components for a11y compliance (Storybook a11y panel)
- [ ] Write component-level MDX documentation
- [ ] Set up `CHANGELOG.md` and semantic versioning
- [ ] Publish `0.1.0` to npm

---

## Open Questions / Future Considerations

- **Monorepo**: If this grows to multiple packages (tokens-only, icons, etc.), consider moving to a pnpm workspace monorepo.
- **Theming**: CSS custom property overrides cover light/dark theming. A `ThemeProvider` React context can be added later if programmatic theme switching is needed.
- **CSS output**: Vite will emit a `styles.css` file. Consumers need to import it once at the app root. We can document this in the README.
- **Chromatic**: Visual regression testing can be layered in later via `chromatic` npm package + GitHub Actions with minimal config changes.
