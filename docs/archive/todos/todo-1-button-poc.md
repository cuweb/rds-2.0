# TODO 1 — Component folder convention + Button POC

**Status:** Blocked on TODO 1 (needs the fluid clamp fix so tokens
render correctly).

## Context

Before building out a larger catalogue of components, we want to nail
down the authoring convention and validate the CSS pipeline end-to-end
with a single minimal component. Button is a good POC because it
exercises tokens (color, spacing, radius, font-size, font-weight),
states (`:hover`, `:focus-visible`, `:disabled`), and polymorphism
(renders as `<button>` or `<a>`).

Requirements:

- Each component has a self-contained SCSS file that uses `var(--rds--*)`
  tokens only — no hardcoded values.
- Components inherit from the library globals (base element styles, font,
  focus outlines).
- Class names are BEM-ish and globally unique under the `rds-` prefix so
  they work in WordPress block contexts.
- Nothing in `src/docs/` or `src/layouts/` is imported from `src/index.ts`
  (those must never leak into the published bundle).

## Folder convention

```
src/components/
  Button/
    Button.tsx          // imports './Button.scss'
    Button.scss         // BEM: .rds-button, .rds-button--*
    Button.stories.tsx  // title: 'Components/Button'
    index.ts            // re-export Button and ButtonProps
```

Rules:
- `Button.tsx` must `import './Button.scss'` so the component's CSS
  travels with any JS import of the component.
- `Button.scss` uses only `var(--rds--*)` custom properties — no
  hardcoded colors, sizes, or spacing.
- `index.ts` re-exports `Button` and its `ButtonProps` type.
- `src/index.ts` re-exports each component's `index.ts`.

## Changes

### New files

- `src/components/Button/Button.tsx`
  - Props:
    - `variant?: 'primary' | 'secondary'` — default `'primary'`
    - `size?: 'small' | 'medium' | 'large'` — default `'medium'`
    - `disabled?: boolean`
    - `href?: string` — when set, renders `<a>` instead of `<button>`
    - Standard HTML attributes and `children`
  - Forwards ref to the underlying element.
  - Renders `<button type="button">` by default, `<a>` when `href` is set.
  - No icon slot, no loading state (deferred to a later iteration).
- `src/components/Button/Button.scss`
  - Base: `.rds-button`
  - Variants: `.rds-button--primary`, `.rds-button--secondary`
  - Sizes: `.rds-button--small`, `.rds-button--large`
    (medium is the default base style)
  - States:
    - `:hover` (not disabled)
    - `:focus-visible` (relies on global focus outline from
      `_globals.scss`)
    - `:disabled` / `[aria-disabled="true"]`
  - Token usage: `var(--rds--color-primary)`, `var(--rds--color-white)`,
    `var(--rds--color-secondary)`, `var(--rds--color-black)`,
    `var(--rds--spacing-*)`, `var(--rds--font-size-*)`,
    `var(--rds--font-weight-*)`, `var(--rds--radius-md)`.
- `src/components/Button/Button.stories.tsx`
  - `title: 'Components/Button'`
  - Stories: `Default`, `Variants`, `Sizes`, `Disabled`, `AsLink`
- `src/components/Button/index.ts`
  ```ts
  export { Button } from './Button';
  export type { ButtonProps } from './Button';
  ```

### Edited files

- `src/index.ts`
  - Add `export * from './components/Button';`
  - Keep existing `import './styles/main.scss';`.

## Test plan

Run `nvm use && pnpm install && pnpm dev` and verify each item:

- [ ] Sidebar shows **Components → Button** with the defined stories.
- [ ] `Default` story renders a `<button>` with primary background and
      white text.
- [ ] `Variants` story shows both `primary` and `secondary` side by side.
- [ ] `Sizes` story shows `small`, `medium`, `large` with visibly
      different paddings and font sizes.
- [ ] `Disabled` story renders a non-interactive button, cursor
      `not-allowed`, reduced opacity.
- [ ] `AsLink` story renders an `<a>` element, not a `<button>`, with
      the same visual styling.
- [ ] Hover state changes color appropriately for each variant.
- [ ] `:focus-visible` shows the global 2px primary outline at 2px offset.
- [ ] Storybook a11y panel reports no violations on **every** Button
      story (`test: 'error'` is global).
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm lint` passes.

Then run `pnpm build` and verify:

- [ ] `dist/index.mjs` exports a named `Button`.
- [ ] `dist/index.d.ts` contains `ButtonProps`.
- [ ] `dist/style.css` contains `.rds-button` and all variant/size/state
      rules.
- [ ] No story or layout files leak into `dist/` (grep for
      `PageLayout`, `stylebook`, `Button.stories`).
- [ ] `pnpm size` passes. If new CSS pushes past the 10 kB limit,
      raise the limit in `package.json` and note it in the commit.

## Open questions

- Secondary variant colors: `c2b.config.json` defines `secondary`
  (`#426587`) and `secondary-dark` (`#2c3c4e`). Should the Button's
  `secondary` variant use those, or should it use a neutral-based
  treatment (e.g. `grey-pale` background, `black` text, primary border)?
  Decide before implementing.

## Follow-ups

- TODO 3 will wire this component into the multi-entry build so it also
  emits `dist/components/Button/style.css` and a per-component JS entry.
