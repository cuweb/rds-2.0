# TODO 1 — Unblock the PageLayout story (fix missing CSS)

**Status:** Blocked on upstream `@troychaplin/component2block` fix.

## Context

The `Layouts / Page Layout` story in `src/layouts/PageLayout.stories.tsx` uses
WordPress-style layout classes (`alignfull has-global-padding is-layout-constrained`)
and expects element styles on `h1`–`h6`, but nothing is rendering correctly
because:

1. `src/styles/main.scss` does not import the generated
   `src/styles/automated/_content-generated.scss` file (layout classes + heading
   element rules).
2. `src/styles/main.scss` does not import the generated
   `src/styles/automated/fonts.css` file (Inter `@font-face` declarations).
3. The generated `_content-generated.scss` contains bugs in the `h1`–`h4`
   rules (invalid CSS values like `font-size: 6x-large;`), caused by a
   generator bug in `@troychaplin/component2block`.
4. `c2b.config.json` `baseStyles.h1`–`h4` reference font-size tokens that
   do not exist in the tokens block (`6x-large` … `3x-large`). Only
   `heading-small` → `heading-primary` are defined.
5. The story title is `Layouts/Templates` but should render as
   `Layouts/Page Layout` in the sidebar per the project convention.

## Prerequisites

- [ ] Fix the `baseStyles.h1`–`h4` generator output in
      `@troychaplin/component2block` so the emitted CSS uses real token
      names via `var(--rds--font-size-*)`.
- [ ] Update `c2b.config.json` `baseStyles.h1`–`h4` to reference real
      token names (e.g. `heading-primary`, `heading-x-large`,
      `heading-large`, `heading-medium`). This pairs with the c2b fix.
- [ ] Publish a new `@troychaplin/component2block` release and bump the
      dev dependency.
- [ ] Re-run `pnpm c2b` so `src/styles/automated/_content-generated.scss`
      is regenerated cleanly.

## Changes

- `src/styles/main.scss`
  - Add `@use "./automated/content-generated";`
  - Add `@use "./automated/fonts.css";`
  - Keep existing `modern-normalize`, `tokens.css`, and `base/globals` imports.
- `src/layouts/PageLayout.stories.tsx:4`
  - `title: 'Layouts/Templates'` → `title: 'Layouts/Page Layout'`

## Test plan

Run `nvm use && pnpm install && pnpm dev` and verify each item:

- [ ] Sidebar shows **Layouts → Page Layout** (no "Templates").
- [ ] Page Layout story renders with Inter font loaded (check Network tab
      for `inter-*.woff2` requests).
- [ ] Headings render in `--rds--color-primary` with the correct fluid
      font sizes from `tokens.css`.
- [ ] `.is-layout-constrained` produces a max-width container at
      `--rds--layout-content-size` (1024px).
- [ ] `.has-global-padding` applies horizontal padding using
      `--rds--spacing-large`.
- [ ] `.alignfull` children break out full-bleed as expected.
- [ ] Storybook a11y panel reports no violations on the story
      (`test: 'error'` is set globally in `.storybook/preview.ts`).
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm lint` passes.

## Follow-ups

- TODO 2 and TODO 3 depend on this working first, because they both
  need the base stylesheet pipeline to be correct before adding
  component-level CSS.
