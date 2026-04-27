# Testing

What runs locally, what runs in CI, and what the husky hooks enforce.

## Quick reference

```sh
pnpm typecheck         # tsc --noEmit
pnpm lint              # ESLint over src/
pnpm lint:fix          # ESLint with --fix
pnpm test              # Vitest run (unit tests)
pnpm test:watch        # Vitest in watch mode
pnpm test:storybook    # Vitest project that runs all stories + a11y axe
pnpm test:coverage     # Vitest with coverage
pnpm format            # Prettier write
pnpm format:check      # Prettier check (no write)
pnpm size              # size-limit check
```

## Type checking

[`tsconfig.json`](../../tsconfig.json) drives `pnpm typecheck`. The build uses [`tsconfig.build.json`](../../tsconfig.build.json) (a stricter subset). Both must pass before a release.

## Linting

ESLint config in [`eslint.config.mjs`](../../eslint.config.mjs). Plugins:

- `@eslint/js` — base recommended rules
- `eslint-plugin-react` + `eslint-plugin-react-hooks` — React rules
- `eslint-plugin-jsx-a11y` — static a11y checks (complements axe)
- `eslint-plugin-storybook` — story conventions
- `eslint-config-prettier` — disables formatting rules that would conflict with Prettier
- `typescript-eslint` — TypeScript-aware rules

`pnpm lint:fix` auto-fixes what it can. The pre-commit hook runs `pnpm lint` (no `--fix`), so commit fixes separately.

## Unit tests with Vitest

Configured in [`vitest.config.ts`](../../vitest.config.ts). Setup file: [`vitest.setup.ts`](../../vitest.setup.ts) — pulls in `@testing-library/jest-dom` for DOM matchers.

Component tests are co-located when present (e.g., `src/components/Foo/Foo.test.tsx`). Most coverage today comes from Storybook a11y tests rather than dedicated unit tests.

## Storybook + accessibility

`pnpm test:storybook` runs every story through Vitest with the `@storybook/addon-vitest` integration, executing each story in headless Playwright and running [axe](https://github.com/dequelabs/axe-core) over the rendered output.

Configured in [`.storybook/preview.ts`](../../.storybook/preview.ts):

```ts
parameters: {
  a11y: {
    test: 'error',  // axe violations fail the run
  },
}
```

### Skipping a11y on specific stories

Only valid when the story's structure causes a *false-positive* axe failure that doesn't reflect a real consumer issue. Example: the `<Body>` component renders `<body>` inside Storybook's wrapping `<div>`, which axe flags as nested document landmarks — that's a story artifact, not a component bug.

```tsx
tags: ['autodocs', '!test'],
parameters: {
  a11y: { test: 'off' },
},
```

The `!test` tag skips the story in `pnpm test:storybook` while keeping it visible in Storybook dev. Don't use this to paper over real violations.

### Disabling a specific axe rule on a story

When the violation is a story-structure concern (e.g., `landmark-complementary-is-top-level` flagging an `<aside>` rendered standalone for demo purposes):

```tsx
parameters: {
  a11y: {
    config: {
      rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
    },
  },
}
```

Never disable `color-contrast` without fixing the underlying token / component design.

## Husky hooks

Set up by [`pnpm prepare`](../../package.json) (runs automatically after `pnpm install`).

| Hook | Runs |
|---|---|
| [`pre-commit`](../../.husky/pre-commit) | `pnpm lint` + `pnpm typecheck` |
| [`pre-push`](../../.husky/pre-push) | `pnpm test:storybook` (Node 22+ required) |

If a hook fails:

- **Investigate the failure** — don't `--no-verify`. The hooks exist because mocked failures masked real bugs in the past.
- For long pre-push runs (a11y across all stories takes ~30s+), wait it out — pushing broken stories breaks the whole Storybook deploy.

## Bundle size

[`size-limit`](https://github.com/ai/size-limit) tracks `dist/index.mjs` and `dist/style.css` under 10kB each — see the `size-limit` array in [`package.json`](../../package.json).

```sh
pnpm build
pnpm size
```

If a real change pushes past the limit, raise it in `package.json` and note the new value in the commit message — don't silently bump.

## CI

The workflows in [`.github/workflows/`](../../.github/workflows/):

- [`ci.yml`](../../.github/workflows/ci.yml) — runs on PRs: install, typecheck, lint, test
- [`deploy-storybook.yml`](../../.github/workflows/deploy-storybook.yml) — builds and publishes the Storybook to GitHub Pages on push to `main`

CI uses the same `pnpm` scripts as local dev — if hooks pass locally, CI usually passes.
