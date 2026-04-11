# TODO 4 — Consumer documentation and authoring conventions

**Status:** Blocked on TODO 3 (documentation should reference the real
shipped package shape).

## Context

With the build pipeline settled and a Button POC shipping, the docs
need to tell both types of consumers how to use the package, and tell
contributors how to add new components.

## Changes

### `src/docs/Overview.mdx`
- Update the "What's inside" list:
  - `React components — Button (more coming)` (replace
    `_coming soon_`).
- Update the source link if the repo name has changed.

### Getting Started (new content under the existing Overview group)

If `src/docs/GettingStarted.mdx` does not yet exist as a standalone
file, create one with `title="Overview/Getting Started"`. Otherwise
edit the existing anchors:

Sections:

1. **Installation**
   ```bash
   pnpm add @carletonuniversity/c2b-storybook
   # or
   npm install @carletonuniversity/c2b-storybook
   ```

2. **Next.js / modern framework usage**
   - Import the stylesheet once, typically in `app/layout.tsx` or
     `_app.tsx`:
     ```tsx
     import '@carletonuniversity/c2b-storybook/styles';
     ```
   - Import components as needed:
     ```tsx
     import { Button } from '@carletonuniversity/c2b-storybook';
     ```
   - Document the tokens-only and globals-only entry points for
     gradual-adoption scenarios:
     ```tsx
     import '@carletonuniversity/c2b-storybook/tokens';
     import '@carletonuniversity/c2b-storybook/globals';
     ```

3. **WordPress block theme usage**
   - Enqueue the bundled stylesheet from the theme's `functions.php`
     (or a dedicated init file). Provide a minimal code example that
     references a `dist/` path under `node_modules` or a vendored copy.
   - Note: `dist/cutheme/theme.json` and `integrate.php` are generated
     by `@troychaplin/component2block` for theme-level token
     integration. Document that this is separate from the React
     component CSS.

4. **WordPress custom block plugin usage**
   - A block that uses the Button component imports just Button's CSS
     from its `editor.scss` and `style.scss`:
     ```scss
     // block-name/src/editor.scss
     @import '@carletonuniversity/c2b-storybook/components/Button/style.css';
     ```
     ```scss
     // block-name/src/style.scss
     @import '@carletonuniversity/c2b-storybook/components/Button/style.css';
     ```
   - Document that CSS duplication across blocks is intentional and
     acceptable — each block is a self-contained unit in the block
     editor, and tokens are loaded once at the site level.
   - Note that the block should use `<button class="rds-button rds-button--primary">…</button>`
     directly; this package does not ship PHP render helpers.

5. **Accessibility**
   - Link to the Storybook a11y addon.
   - Note that every story is run through axe with `test: 'error'`,
     so consumers can rely on the ship criteria for the components.

### New file: `docs/authoring-components.md`

Contributor-facing rules for adding a new component:

- Folder layout (see TODO 2).
- Class-naming rules: `.rds-<component>`, `.rds-<component>--<modifier>`.
- Tokens-only authoring: every color, spacing, size, radius, shadow
  value in SCSS must come from a `var(--rds--*)` custom property. No
  hex codes, no magic pixel values.
- Each component re-exports from its `index.ts`, and `src/index.ts`
  re-exports the component.
- Each component imports its own `.scss` file from its `.tsx`.
- Never import anything under `src/docs/`, `src/layouts/`, or
  `src/entries/` from `src/index.ts` — these must not leak into the
  published bundle.
- After adding a component, update `vite.config.ts` entry map **and**
  `package.json` `exports` map (or regenerate via the `exports` script
  once it exists — see TODO 3 follow-ups).
- Every story must pass axe. Global setting is `test: 'error'`.

### `README.md`
- Update the project description and install example to use
  `@carletonuniversity/c2b-storybook`.
- Link to `src/docs/Overview.mdx` and `docs/authoring-components.md`.

## Test plan

- [ ] `pnpm dev`: Overview and Getting Started pages render, no MDX
      compilation errors.
- [ ] Every import path shown in the docs resolves in `dist/` after
      `pnpm build` (physically walk the paths).
- [ ] Copy each code sample into a scratch file and confirm it
      typechecks or lints in its target context.
- [ ] a11y panel clean on any new MDX pages (`test: 'error'`).
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm format:check` passes.

## Open questions

- Do you want `docs/authoring-components.md` to live in `/docs` next
  to the TODO files, or at `src/docs/authoring-components.mdx` so it
  shows up inside Storybook as part of the docs group? If the latter,
  the file should follow the existing MDX import conventions used by
  the stylebook pages.
- Is there an existing `README.md` content you want preserved, or
  should the README become a short redirect to the Storybook docs?

## Follow-ups

- When a second component ships, revisit these docs to confirm the
  import-path guidance scales.
- Consider publishing the built Storybook to GitHub Pages with the
  new package name on the landing page (workflow already exists at
  `.github/workflows/deploy-storybook.yml`).
