---
applyTo: "**/*.stories.tsx"
---

# Storybook Story Conventions

## Story Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Component } from './Component'

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
}

export default meta
type Story = StoryObj<typeof Component>
```

## Args Pattern

Always use inline `args` inside the story object — never the external assignment pattern:

```tsx
// Correct
export const Primary: Story = {
  args: {
    children: 'Content',
  },
}

// Wrong — do not use
export const Primary: Story = {}
Primary.args = { children: 'Content' }
```

## Controls

- Use `argTypes` with `control` for enum/union props
- Use `'inline-radio'` for small option sets (2–4 options)
- Use `'select'` for larger option sets
- Match options to the actual TypeScript type values

```tsx
argTypes: {
  as: {
    control: 'inline-radio',
    options: ['section', 'div'],
  },
  maxWidth: {
    control: 'select',
    options: ['aligncontent', 'alignwide', 'alignfull'],
  },
},
```

## Render Functions

- Only add a `render` function when you need custom layout wrapping or conditional logic
- Don't add `render` if it just passes args through — Storybook does that by default
- Don't pass empty `args: {}` if the story doesn't use args
- Don't import or cast types that aren't used

## A11y

- A11y violations fail as errors (configured globally)
- Disable rules per-story with `parameters.a11y.config.rules` when the violation is a story structure concern, not a component bug
- Never disable a11y rules globally
