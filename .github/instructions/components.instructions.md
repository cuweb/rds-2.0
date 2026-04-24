---
applyTo: "src/components/**/*.tsx"
---

# Component Conventions

## File Structure

Each component lives in its own folder under `src/components/`:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
├── ComponentName.stories.tsx  # Storybook stories
├── index.ts                   # Barrel export
└── styles.scss                # Component styles (optional)
```

## Component Patterns

- Export a named interface for props: `export interface ComponentNameProps`
- Export the component as a named export: `export const ComponentName`
- Add the component export to `src/index.ts` to include it in the package entry
- Add the component name to `componentNames` in `vite.config.components.ts` for per-component build output
- Use `children: React.ReactNode` for wrapper components
- For polymorphic shapes, prefer discriminated unions over optional prop combos
- Use typed keys from `src/utils/propClasses.tsx` for shared prop options

## Subcomponents

Use `Object.assign` to attach subcomponents, and set `displayName`:

```tsx
export const Column = Object.assign(ColumnWrapper, {
  Content: ColumnContent,
});
ColumnWrapper.displayName = 'Column';
```

## Class Names

- Build class names using BEM: `cu-component`, `cu-component--modifier`, `cu-component__element`
- Use `undefined` instead of `''` to avoid rendering empty `class=""` attributes
- Conditional classes: ternary to `undefined` — `reverse ? 'is-first' : undefined`

## Styles

- Import component SCSS directly: `import './styles.scss';`
- All visual values come from `--rds--*` design tokens (colors, spacing, radii, etc.)
- See the SCSS-specific instructions for details

## Icons

When a component accepts an icon, type it as `IconName` from `@cuweb/rds-icons` (peer dep):

```tsx
import { Icon } from '../Icon/Icon';
import type { IconName } from '@cuweb/rds-icons';

interface ButtonProps {
  icon?: IconName;
  // ...
}

// Render
{icon && <Icon name={icon} size={20} />}
```

This gives consumers autocomplete on icon names and catches typos at compile time. Never import SVG files directly — icons only come through the peer dependency.

## Accessibility

- Spread ARIA/HTML attrs through `...rest` so consumers can override
- For decorative icons, the default `aria-hidden="true"` is applied by `<Icon>`
- For meaningful icons, pass `title` to `<Icon>` — it sets `role="img"` + `<title>` automatically
- Interactive components must extend the appropriate element's HTMLAttributes (e.g., `React.ComponentPropsWithoutRef<'button'>`) so DOM events pass through

## LinkProvider

Components that render links (e.g., Badge with `href`) should use `useLinkContext()` from `src/components/LinkProvider/` to get the consumer's Link component (Next.js `Link`, React Router `Link`, or a plain `<a>` fallback).

```tsx
import { useLinkContext } from '../LinkProvider/useLinkContext';

export const MyComponent = ({ href, ...rest }) => {
  // eslint-disable-next-line react-hooks/static-components -- stable component from context
  const LinkComponent = useLinkContext();
  if (href) {
    // eslint-disable-next-line react-hooks/static-components -- injected via context
    return <LinkComponent href={href} {...rest}>...</LinkComponent>;
  }
  return <span {...rest}>...</span>;
};
```
