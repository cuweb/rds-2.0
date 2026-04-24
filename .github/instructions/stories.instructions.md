---
applyTo: "**/*.stories.tsx"
---

# Storybook Story Conventions

## Story Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Category/Component',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for enum/union props
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;
```

## Title Taxonomy

- `Components/Elements/*` — atomic UI (Badge, Button, Icon, BadgeGroup, ButtonGroup)
- `Components/Layout/*` — structural (Article, Aside, Body, Column, Main, Section)
- `Components/Utilities/*` — context providers and non-visual helpers (LinkProvider)
- `Overview/Templates/*` — full-page compositions

## Args Pattern

Use inline `args` inside the story object. Do not use the `Primary.args = {...}` external-assignment pattern.

```tsx
// Correct
export const Primary: Story = {
  args: {
    text: 'Badge',
    color: 'green',
  },
};

// Wrong
export const Primary: Story = {};
Primary.args = { text: 'Badge' };
```

Omit `args: {}` entirely if a story doesn't need args. Omit default-matching args unless they demonstrate a meaningful control.

## Controls (argTypes)

Always define `argTypes` for props with a union type so Storybook renders a dropdown instead of a free-text input.

- `'inline-radio'` for small option sets (2–4)
- `'select'` for larger option sets
- Match options exactly to the TypeScript union

```tsx
argTypes: {
  color: {
    control: 'select',
    options: ['grey', 'green', 'red', 'yellow', 'blue'],
  },
  rounded: {
    control: 'inline-radio',
    options: ['sm', 'md', 'lg', 'full'],
  },
},
```

## Render Functions

**Render functions must be expression-bodied**, not block-bodied. `.storybook/preview.ts` has a source transform that unwraps `{ render: (args) => <JSX /> }` in the docs code panel. A block body (`render: (args) => { ... return (...); }`) breaks the transform.

```tsx
// Correct — expression body
render: (args) => (
  <Main>
    <Section>
      <Component {...args} />
    </Section>
  </Main>
)

// Wrong — block body
render: (args) => {
  const computed = args.foo ?? 'default';
  return <Component {...args} computed={computed} />;
}
```

If you need derived values, compute them inline in the JSX (conditional expressions, ternaries) or hoist them outside the render function.

Only add `render` when you need custom layout wrapping or conditional composition. If the story is just `<Component {...args} />` with args, omit `render` — Storybook generates it.

## Shared Story Content

Use helpers from `src/data/storyContent.tsx` instead of inlining lorem ipsum:

```tsx
import { MultiParagraph, SingleParagraph, SampleList } from '../../data/storyContent';

render: () => (
  <Section>
    <MultiParagraph count={2} />
  </Section>
)
```

## Accessibility

- A11y violations fail as errors (configured globally in `.storybook/preview.ts`)
- Disable rules per-story only when the violation is a story-structure concern (e.g., `landmark-complementary-is-top-level` when an `<aside>` is standalone):

```tsx
parameters: {
  a11y: {
    config: {
      rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
    },
  },
},
```

- Never disable a11y rules globally
- Never disable `color-contrast` without fixing the underlying design-system issue

## Excluding from tests

If a story can't pass axe tests for architectural reasons (e.g., `<Body>` renders `<body>` inside Storybook's wrapping `<div>`), use:

```tsx
tags: ['autodocs', '!test'],
parameters: {
  a11y: { test: 'off' },
},
```

The `!test` tag skips the story in `pnpm test:storybook` while keeping it visible in Storybook dev.

## Icon demos

For stories that demonstrate multiple icons or colors:

```tsx
import { iconList, type IconName } from '@cuweb/rds-icons';
```

Don't hardcode icon names in arrays — use `iconList` for grid/select demos. Use `IconName` type when passing to `<Icon name={...} />` from a dynamic source.
