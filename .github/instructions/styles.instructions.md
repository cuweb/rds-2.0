---
applyTo: "**/*.scss"
---

# SCSS Conventions

## Design Tokens

- All visual values (colors, spacing, font sizes, shadows, radii) must use `--rds--` CSS custom properties
- Never hardcode hex colors, pixel sizes, or font stacks
- Token reference: `src/styles/auto/tokens.css`

```scss
// Correct
color: var(--rds--color-primary);
gap: var(--rds--spacing-large);
font-size: var(--rds--font-size-large);

// Wrong
color: #e91c24;
gap: 1.5rem;
```

## Class Naming

- BEM with `cu-` prefix: `.cu-component`, `.cu-component--modifier`, `.cu-component__element`
- Utility classes use `cu-utils--` prefix

## Responsive Breakpoints

- Use the globally available mixins — no `@use` or `@import` needed
- `@include above($width)` — min-width media query
- `@include below($width)` — max-width media query
- Mobile-first: default styles are mobile, use `above()` to enhance

```scss
.cu-column--two {
    grid-template-columns: 1fr;

    @include above(768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
```

## File Location

- Component styles: `src/components/ComponentName/styles.scss`
- Global styles: `src/styles/base/`
- Generated files: `src/styles/auto/` — do not edit manually
