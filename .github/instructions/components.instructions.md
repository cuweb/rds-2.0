---
applyTo: "src/components/**/*.tsx"
---

# Component Conventions

## File Structure

Each component lives in its own folder under `src/components/`:

```
src/components/ComponentName/
  ComponentName.tsx          # Component implementation
  ComponentName.stories.tsx  # Storybook stories
  styles.scss                # Component styles (optional)
```

## Component Patterns

- Export a named interface for props: `export interface ComponentNameProps`
- Export a named component: `export const ComponentName`
- Add the component export to `src/index.ts` to include it in the build
- Use `children: React.ReactNode` for wrapper components
- Use typed keys from `propClasses.tsx` for shared prop options (e.g. `maxWidthKeys`)

## Subcomponents

Use `Object.assign` to attach subcomponents, and set `displayName`:

```tsx
export const Column = Object.assign(ColumnWrapper, {
  Content: ColumnContent,
})
ColumnWrapper.displayName = 'Column'
```

## Class Names

- Use `undefined` instead of `''` to avoid rendering empty `class=""` attributes
- Build class names using BEM: `cu-component`, `cu-component--modifier`
- For conditional classes, use ternary to `undefined`: `reverse ? 'is-first' : undefined`

## Styles

- Import component SCSS directly: `import './styles.scss'`
- Use `--rds--` design tokens for all values (colors, spacing, font sizes, etc.)
- SCSS mixins `above()` and `below()` are available globally — no import needed
- Do not use Tailwind utility classes
