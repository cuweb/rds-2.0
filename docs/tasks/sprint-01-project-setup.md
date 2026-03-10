# Sprint 1 — Project Setup

Initialize the project, install dependencies, and configure all tooling. This sprint produces a fully configured development environment with no components yet.

**Estimated total: ~2 hours**

---

## Task 1.1 — Initialize Project & Editor Configs

**Time estimate:** 15 minutes

**Description:**
Create the pnpm project, Node version file, Git ignore rules, and editor configuration. This establishes the project root and ensures consistent environments across contributors.

- Run `pnpm init` to generate `package.json`
- Set `"name": "@carletonuniversity/rds-2.0"`, `"type": "module"`, and `"private": false`
- Create `.nvmrc` with `22`
- Create `.gitignore` (node_modules, dist, storybook-static, coverage, .DS_Store, etc.)
- Create `.editorconfig` (utf-8, 2-space indent, LF line endings, trailing newline)

**Resources:**

- [PLAN.md — Project Structure](../PLAN.md) for the full file tree
- [PLAN.md — Install Commands](../PLAN.md) for `pnpm init`

---

## Task 1.2 — Install Core Dependencies

**Time estimate:** 10 minutes

**Description:**
Install React 18 (pinned for WordPress compatibility), TypeScript, and Sass as dev dependencies. React will be declared as a peer dependency for consumers.

```bash
pnpm add -D react@18 react-dom@18 @types/react@18 @types/react-dom@18 typescript sass
```

**Resources:**

- [PLAN.md — Dependencies: Core](../PLAN.md)

---

## Task 1.3 — Configure TypeScript

**Time estimate:** 20 minutes

**Description:**
Create two TypeScript configs: a base `tsconfig.json` for development (includes everything) and a `tsconfig.build.json` for library output (excludes tests, stories, and Storybook config).

- `tsconfig.json`: strict mode, JSX react-jsx, ES2022 target, module ESNext, moduleResolution bundler, path aliases if needed, include `src/`
- `tsconfig.build.json`: extends base, adds `exclude` for `**/*.test.tsx`, `**/*.stories.tsx`, `.storybook/`

**Resources:**

- [PLAN.md — Project Structure](../PLAN.md) for file locations

---

## Task 1.4 — Configure Vite

**Time estimate:** 20 minutes

**Description:**
Set up `vite.config.ts` in library mode. The config defines the build entry point, output formats (ESM + CJS), external peer dependencies, and SCSS support. SCSS works out of the box with Vite once `sass` is installed.

- Entry: `src/index.ts`
- Formats: `es` and `cjs`
- Externals: `react`, `react-dom`, `react/jsx-runtime`
- Plugins: `@vitejs/plugin-react`, `vite-plugin-dts`

```bash
pnpm add -D vite @vitejs/plugin-react vite-plugin-dts
```

**Resources:**

- [PLAN.md — Vite Library Build](../PLAN.md) for the full config example
- [PLAN.md — Package.json exports](../PLAN.md) for the exports map

---

## Task 1.5 — Configure ESLint 9 + Prettier

**Time estimate:** 45 minutes

**Description:**
Set up ESLint 9 with flat config (`eslint.config.mjs`) and Prettier for formatting. This is the most complex config step since ESLint 9 uses a different config format than previous versions.

- Create `eslint.config.mjs` with flat config array
- Include: `@eslint/js` recommended, `typescript-eslint` strict, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-storybook`
- Disable rules that conflict with Prettier via `eslint-config-prettier`
- Create `.prettierrc` (semi, singleQuote, trailingComma, printWidth, tabWidth)

```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-storybook prettier eslint-config-prettier
```

**Resources:**

- [PLAN.md — Dependencies: Linting & Formatting](../PLAN.md) for the full package list
- [PLAN.md — Scripts](../PLAN.md) for the `lint`, `lint:fix`, `format`, `format:check` scripts

---

## Task 1.6 — Configure Vitest

**Time estimate:** 20 minutes

**Description:**
Create `vitest.config.ts` configured for browser mode using Playwright Chromium. This pairs with the Storybook Vitest addon that will be set up in Sprint 3. For now, ensure the base Vitest config works for unit tests.

- Configure browser mode with `playwright` provider and `chromium` browser
- Set up test globals, include pattern (`src/**/*.test.{ts,tsx}`)
- Configure CSS modules support for testing components with SCSS modules
- Add Testing Library packages

```bash
pnpm add -D vitest @playwright/test @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Resources:**

- [PLAN.md — Dependencies: Testing](../PLAN.md) for the package list
- [PLAN.md — Testing Strategy](../PLAN.md) for browser mode details and test execution approaches

---

## Checklist

- [ ] 1.1 — Initialize Project & Editor Configs
- [ ] 1.2 — Install Core Dependencies
- [ ] 1.3 — Configure TypeScript
- [ ] 1.4 — Configure Vite
- [ ] 1.5 — Configure ESLint 9 + Prettier
- [ ] 1.6 — Configure Vitest
