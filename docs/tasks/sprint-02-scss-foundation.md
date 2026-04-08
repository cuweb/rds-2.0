# Sprint 2 — SCSS Foundation

Build the design token layer, mixin library, base styles, and consumer entry point. After this sprint, the full SCSS architecture is in place and ready for components to consume.

**Estimated total: ~2.25 hours**

**Prerequisite:** Sprint 1 (project tooling configured)

---

## Task 2.1 — Create Design Tokens

**Time estimate:** 1 hour

**Description:**
Create the token partials in `src/tokens/`. Tokens are SCSS variables and maps that define the visual language of the design system. These files produce **no CSS output** — they only define values for other layers to consume via `@use`.

Files to create:

- `_colors.scss` — Brand colors (Carleton red `#bf112b`, navy `#0d3d6b`), neutral scale (50–900), semantic colors (success, warning, error, info), and the `$colors` map for programmatic access
- `_spacing.scss` — Spacing scale from `0` through `4xl` using rem values, plus the `$spacing` map
- `_typography.scss` — Font families (base, heading, mono), font-size scale (xs–5xl) with `$font-sizes` map, weights (regular, medium, semibold, bold), line-heights (tight, base, loose), and `$heading-scale` map for heading levels 1–6
- `_breakpoints.scss` — Responsive breakpoints (sm 640px through 2xl 1536px) with `$breakpoints` map
- `_index.scss` — Barrel file that `@forward`s all token partials

**Resources:**

- [docs/scss/tokens.md](../scss/tokens.md) — Full token reference with all variables, maps, and values
- [docs/scss/README.md](../scss/README.md) — Layer architecture explaining why tokens produce no CSS
- [PLAN.md — Design Tokens](../PLAN.md) for the sample token code

---

## Task 2.2 — Create Mixins

**Time estimate:** 45 minutes

**Description:**
Create the mixin partials in `src/mixins/`. Mixins provide reusable style logic that consumes tokens. Like tokens, mixin files produce **no CSS output** — they define `@mixin` rules that components and base styles invoke.

Files to create:

- `_responsive.scss` — `responsive($breakpoint)` (min-width), `responsive-down($breakpoint)` (max-width), `responsive-between($min, $max)` — all read from the `$breakpoints` map
- `_typography.scss` — `heading($level)` (reads `$heading-scale` map for font-size, weight, line-height), `body-text($size)`, `truncate()`, `line-clamp($lines)`
- `_index.scss` — Barrel file that `@forward`s all mixin partials

Each mixin should `@use '../tokens' as tokens;` to access token values.

**Resources:**

- [docs/scss/mixins.md](../scss/mixins.md) — Full mixin reference with input/output examples for every mixin
- [docs/scss/tokens.md](../scss/tokens.md) — Token maps that mixins consume (`$breakpoints`, `$heading-scale`, etc.)

---

## Task 2.3 — Create Base Styles

**Time estimate:** 30 minutes

**Description:**
Create the base style partials in `src/base/`. Unlike tokens and mixins, base styles **produce actual CSS output** — they define the global reset and default element styles that ship with the library.

Files to create:

- `_reset.scss` — Modern CSS reset: `box-sizing: border-box` on all elements, zero default margins, responsive media defaults, form font inheritance, `prefers-reduced-motion` support
- `_globals.scss` — HTML/body base styles using tokens (font-family, font-size, line-height, color, background), `:focus-visible` outline styles, `::selection` styling, smooth scroll for `prefers-reduced-motion: no-preference`
- `_index.scss` — Barrel file that `@use`s reset and globals (order matters: reset first, then globals)

Base styles should `@use '../tokens' as tokens;` and `@use '../mixins' as mixins;` as needed.

**Resources:**

- [docs/scss/base.md](../scss/base.md) — Full reset and globals code with design decision rationale
- [docs/scss/README.md](../scss/README.md) — Explains which layers produce CSS output

---

## Task 2.4 — Create main.scss Entry Point

**Time estimate:** 10 minutes

**Description:**
Create `src/styles/main.scss` — the consumer entry point that Vite compiles to `dist/style.css`. This file is intentionally minimal: it only aggregates the base layer. Component styles are **not** included here (they use CSS Modules and are scoped per-component).

File to create:

- `main.scss` — Contains only `@use '../base';`

After creating the file, verify it compiles by running a quick Sass build or Vite build to confirm no import errors.

**Resources:**

- [docs/scss/main-scss.md](../scss/main-scss.md) — Full explanation of what main.scss includes, excludes, and why
- [docs/scss/README.md](../scss/README.md) — Layer dependency flow diagram

---

## Checklist

- [x] 2.1 — Create Design Tokens
- [x] 2.2 — Create Mixins
- [x] 2.3 — Create Base Styles
- [x] 2.4 — Create main.scss Entry Point

## Notes

- Added `src/scss.d.ts` for TypeScript SCSS module declarations (not in original plan)
- Added `cssFileName: 'style'` to Vite config so output is `dist/style.css` (matches package.json exports)
- Added `import './styles/main.scss'` to `src/index.ts` so Vite extracts the CSS during build
- Build output: `dist/style.css` (0.94 kB) contains reset + globals with token values compiled in
