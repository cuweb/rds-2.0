# Per-component CSS

By default, `import '@carletonuniversity/rds2/styles'` pulls in the bundled stylesheet — tokens, globals, and every component's rules. If you only need a subset of components, you can import each one's CSS individually to ship fewer bytes.

## Pattern

```tsx
import { Badge } from '@carletonuniversity/rds2';
import '@carletonuniversity/rds2/Badge.css';
```

For SCSS contexts (e.g., a WordPress block's `editor.scss`):

```scss
@use '@carletonuniversity/rds2/Badge.scss';
```

## Available subpath exports

Every component with a `styles.scss` source has a CSS and SCSS subpath. Check the [`exports` field in the package's `package.json`](../../package.json) for the authoritative list — the relevant entries are:

```jsonc
{
  "./*.css": "./dist/components/*/styles.css",
  "./*.scss": "./dist/components/*/styles.scss"
}
```

So any component name (e.g., `Badge`, `Button`, `Footer`) becomes a valid path.

## What you also need

Per-component CSS files contain **only** that component's rules. They do **not** include:

- Design tokens (`--rds--*` custom properties)
- Base element styles or normalize
- Layout primitives

Consumers using per-component imports still need the tokens and globals once, somewhere. The simplest pattern: import the bundled stylesheet for those, and let the per-component imports be additive (CSS deduplicates, but rule order matters less when your subset is small).

```tsx
import '@carletonuniversity/rds2/styles';        // tokens + globals + all components
// (or, in the future when split entries land:)
// import '@carletonuniversity/rds2/tokens.css';
// import '@carletonuniversity/rds2/globals.css';

import '@carletonuniversity/rds2/Badge.css';     // only needed if you want the per-component path
```

In a WordPress block context where the bundled stylesheet is already enqueued by the theme, the per-component import in a block's `editor.scss` is what you want — see the [WordPress integration docs](wordpress/) for examples.

## When to use this

- **WordPress blocks** — each block's `editor.scss` and `style.scss` import only the components it uses, so the editor and frontend payloads stay small per-block. CSS will be duplicated across blocks that use the same component, but that's an explicit trade-off.
- **Bundle-size sensitive Next.js routes** — combined with `<ComponentName />` named imports for tree-shakable JS, per-component CSS keeps a small route from pulling the full RDS stylesheet.

For most apps, just use `@carletonuniversity/rds2/styles` once at the root.
