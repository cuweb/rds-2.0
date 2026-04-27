# Icons

Icons in RDS are split across **two packages** for Font Awesome Pro license compliance — the `<Icon>` component lives in the public `@cuweb/rds-2.0`, and the icon data lives in the private `@cuweb/rds-icons`. To use icons, install both.

For the architectural rationale (why two packages), see [contributing/architecture.md](../contributing/architecture.md#two-package-icon-model).

## Quick start

```sh
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

```tsx
import { Icon } from '@cuweb/rds-2.0';

<Icon name="circle-check" size={24} />
```

If `pnpm install` fails with `ERR_PNPM_FETCH_401`, you need GitHub Packages auth — see [installation.md](installation.md#prerequisites).

## The `<Icon>` component

Wraps the raw icon components from `@cuweb/rds-icons` with accessibility handling and a string-name API.

```tsx
import { Icon } from '@cuweb/rds-2.0';

// Default: decorative, inherits text color, size 1em
<Icon name="circle-check" />

// Explicit size (number in px or any CSS length)
<Icon name="circle-check" size={24} />

// Accessible label (sets role="img" + <title>)
<Icon name="circle-check" title="Operation succeeded" />

// Explicit fill (overrides currentColor inheritance)
<Icon name="circle-check" fill="var(--rds--color-primary)" />

// Any SVG prop passes through
<Icon name="circle-check" className="my-icon" onClick={...} />
```

For the full list of available icon names, see [rds-icons README → Import](https://github.com/cuweb/rds-icons#import).

## Three import styles

Pick the right one for your context:

| Style | When | Trade-off |
|---|---|---|
| `<Icon name="..." />` from `@cuweb/rds-2.0` | Default for most usage | Most ergonomic; works with dynamic names; includes a11y defaults |
| `<CircleCheckIcon />` from `@cuweb/rds-icons` | Bundle size matters and names are known at build time | Best tree-shaking in Next.js; no a11y wrapper |
| `iconList` from `@cuweb/rds-icons` | CMS / Gutenberg select controls | Returns `[{ value, label }]` shape consumable by `<SelectControl>` |

```tsx
// Central component (recommended default)
import { Icon } from '@cuweb/rds-2.0';
<Icon name="circle-check" size={24} />

// Named imports (best tree-shaking for known names)
import { CircleCheckIcon } from '@cuweb/rds-icons';
<CircleCheckIcon width={24} height={24} />

// Icon name list for Gutenberg block controls
import { iconList } from '@cuweb/rds-icons';
// → [{ value: 'circle-check', label: 'Circle check' }, ...]
```

## Accessibility

The `<Icon>` component applies sensible defaults:

- **Decorative (default)** — `aria-hidden="true"` and `focusable="false"`. The icon is hidden from screen readers because the surrounding text already conveys meaning.
- **Meaningful** — pass a `title` prop to render `role="img"` plus a `<title>` element. The icon now announces itself.

Don't pass both `aria-hidden` and `title`. If you do, `aria-hidden` wins and the title is ignored.

## FA Pro license compliance checklist

The icon data ships under a Font Awesome Pro license. Carleton's organization license covers Carleton developers as Creators, but **not** the general public. Keep these guardrails:

- ✅ New team member: add to FA Pro seat count BEFORE granting `cuweb/rds-icons` repo access
- ✅ Departing team member: remove repo access AND remove from FA Pro seat count
- ✅ Never make `cuweb/rds-icons` public
- ✅ Never mirror FA Pro SVGs to a publicly-readable CDN, S3 bucket, or other storage
- ✅ For WordPress sites that read SVGs from `node_modules/`, verify the path is not publicly served — test with `curl` against your production domain. See the [WordPress hybrid theme guide](wordpress/hybrid-themes.md#compliance-dont-serve-node_modules-publicly) for the audit pattern.

The legacy production S3 path `cu-production.s3.amazonaws.com/rds/assets/font-awesome/` may already be out of compliance (publicly readable Pro SVGs). Audit and restrict if necessary.

## Related

- [`@cuweb/rds-icons`](https://github.com/cuweb/rds-icons) — the private companion repo
- [Architecture: two-package icon model](../contributing/architecture.md#two-package-icon-model) — why this split exists
- [FA Pro license](https://fontawesome.com/license) — authoritative terms
