# Consuming the Raven Design System

This guide is for Carleton developers using `@cuweb/rds-2.0` in a Next.js app, WordPress block plugin, or WordPress block theme.

**See also:**
- [rds-icons README](https://github.com/cuweb/rds-icons#consuming-this-package) — one-time GitHub Packages auth setup (required before anything here works)
- [ICONS.md](ICONS.md) — architecture rationale for the split-repo design
- [RELEASING.md](RELEASING.md) — for maintainers publishing new versions

## TL;DR

```sh
# One-time per machine: set up GitHub Packages auth
# See rds-icons README for details

# In your project
echo "@cuweb:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

```tsx
import { Badge, Button, Icon } from '@cuweb/rds-2.0';
import '@cuweb/rds-2.0/styles';

<Button title="Save" icon="floppy-disk" />
```

---

## Before you start

The RDS is two packages:

- `@cuweb/rds-2.0` — components, tokens, styles (this repo)
- `@cuweb/rds-icons` — Font Awesome Pro icon components (private, peer dependency)

You install both. Authentication for GitHub Packages is required because rds-icons is private by design — see [ICONS.md](ICONS.md) for why.

**If you haven't set up auth yet**, start at [rds-icons README → Developer onboarding](https://github.com/cuweb/rds-icons#developer-onboarding-one-time). Once that's done (takes ~2 minutes), come back here.

---

## Installing in a Next.js project

### 1. Add the scope config

Create or edit `.npmrc` at your project root:

```
@cuweb:registry=https://npm.pkg.github.com
```

Commit this file. It tells pnpm/npm to look for `@cuweb/*` packages on GitHub Packages, not the public npm registry. It does **not** contain any secrets.

### 2. Install both packages

```sh
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

`rds-icons` is a peer dependency of `rds-2.0` — your package manager will warn you if only one is installed.

### 3. Import styles

In `app/layout.tsx` (App Router) or `pages/_app.tsx` (Pages Router):

```tsx
import '@cuweb/rds-2.0/styles';
```

This imports the full bundled stylesheet (tokens + base + all components). For per-component CSS, see the [Per-component CSS](#per-component-css-bundling) pattern below.

### 4. Use components

```tsx
import { Badge, Button, Column, Icon, LinkProvider, Main, Section } from '@cuweb/rds-2.0';
import Link from 'next/link';

export default function Page() {
  return (
    <LinkProvider component={Link}>
      <Main>
        <Section>
          <Column cols="2">
            <Badge text="New" color="green" />
            <Button title="Get started" icon="circle-check" />
            <Icon name="calendar-clock" size={24} />
          </Column>
        </Section>
      </Main>
    </LinkProvider>
  );
}
```

`<LinkProvider component={Link}>` makes all RDS components use Next.js's `Link` for `href` props — enables prefetching and client-side routing.

### 5. CI authentication

Your deploy pipeline also needs GitHub Packages auth. See [rds-icons README → CI authentication](https://github.com/cuweb/rds-icons#ci-authentication) for the workflow snippet.

---

## Installing in a WordPress block plugin

WordPress block plugins using `@wordpress/scripts` have a standard pnpm/npm setup — nearly identical to Next.js.

### 1. Add `.npmrc` in the plugin root

```
@cuweb:registry=https://npm.pkg.github.com
```

### 2. Install

```sh
cd wp-content/plugins/my-plugin
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

### 3. Use in block edit/save components

```tsx
// src/my-block/edit.tsx
import { Icon } from '@cuweb/rds-2.0';
import { iconList, type IconName } from '@cuweb/rds-icons';
import { SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  return (
    <>
      <SelectControl
        label="Icon"
        value={attributes.iconName}
        options={iconList}  // already { value, label } shaped
        onChange={(iconName: IconName) => setAttributes({ iconName })}
      />
      <Icon name={attributes.iconName} size={24} />
    </>
  );
}
```

### 4. Import per-component SCSS or CSS

Two options depending on your block's style pipeline:

**Option A — per-component compiled CSS** (drop-in, no SCSS tooling needed):

```scss
/* src/my-block/editor.scss */
@import '@cuweb/rds-2.0/Button.css';
```

**Option B — per-component SCSS source** (if your block uses sass-loader):

```scss
@use '@cuweb/rds-2.0/Button.scss';
```

Either will resolve via pnpm → `node_modules/@cuweb/rds-2.0/dist/components/Button/styles.{css|scss}`.

### 5. Server-side (PHP) consumption

SVGs don't ship to PHP automatically. If your block has a `render.php` that needs to emit icon SVG markup, you have options:

- Render icons on the client (via `<Icon>`) — simplest
- Ship the SVG source separately — for static SSR
- Embed icon HTML in `render_callback` — read the SVG file at runtime

Most block plugins stick with client-side rendering. If you need server-side SVG, ask in #design-system.

---

## Installing in a WordPress block theme

Block themes vary widely — some use `@wordpress/scripts`, some don't. Two common patterns:

### Pattern A: Theme uses npm + SCSS build

Same as the block plugin flow. Install via pnpm, import SCSS/CSS in your theme's style entry.

### Pattern B: Theme enqueues static CSS

If your theme doesn't have a JS build step, you can still use the RDS stylesheet:

1. Copy `dist/style.css` from `node_modules/@cuweb/rds-2.0/` into your theme's assets
2. Enqueue it from `functions.php`
3. Use class names directly in templates and patterns

```php
// functions.php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('rds', get_template_directory_uri() . '/assets/rds-style.css');
});
```

You don't get the React components this way — just the design tokens and base styles. Acceptable for block themes that rely on core Gutenberg blocks.

### theme.json integration

`dist/cutheme/theme.json` (generated by `@troychaplin/component2block`) maps RDS design tokens into WordPress Site Editor presets. Merge it into your theme's `theme.json` or enqueue via `integrate.php`.

---

## The `<Icon>` component

`rds-2.0` ships an `<Icon>` component that wraps the raw icon components from `@cuweb/rds-icons` with accessibility handling and a convenient string-name API.

```tsx
import { Icon } from '@cuweb/rds-2.0';

// Default: decorative, inherits text color, size 1em
<Icon name="circle-check" />

// Explicit size (number in px or any CSS length)
<Icon name="circle-check" size={24} />

// Accessible label (adds role="img" + <title>)
<Icon name="circle-check" title="Operation succeeded" />

// Explicit fill (overrides currentColor inheritance)
<Icon name="circle-check" fill="var(--rds--color-primary)" />

// Any SVG prop passes through
<Icon name="circle-check" className="my-icon" onClick={...} />
```

For the full list of available icon names and direct named imports, see [rds-icons README → Import](https://github.com/cuweb/rds-icons#import).

### Which icon import style to use

- **`<Icon name="...">`** — most ergonomic. Works with dynamic names. Includes accessibility defaults. Use this by default.
- **`<CircleCheckIcon />`** (from `@cuweb/rds-icons`) — best tree-shaking in Next.js. Use when bundle size matters and names are known at build time.
- **`iconList`** (from `@cuweb/rds-icons`) — for CMS / Gutenberg select controls where the user picks an icon name.

---

## Per-component CSS bundling

If you don't want the full `style.css`, import individual component styles:

```tsx
import { Badge } from '@cuweb/rds-2.0';
import '@cuweb/rds-2.0/Badge.css';
```

Saves bytes when you're only using a handful of components. Supported for every component with a `styles.scss` source — check the package's `exports` field for the full list.

---

## Updating

```sh
# Update both packages
pnpm up @cuweb/rds-2.0 @cuweb/rds-icons

# Or to a specific version
pnpm add @cuweb/rds-2.0@0.3.0
```

Check the CHANGELOG entries for breaking changes before bumping major versions.

---

## Removing

```sh
pnpm remove @cuweb/rds-2.0 @cuweb/rds-icons
```

Also remove:
- The `@cuweb:registry=...` line from `.npmrc` (unless the project uses other `@cuweb/*` packages)
- `import '@cuweb/rds-2.0/styles'` references

---

## Getting help

- **Bug in a component:** open an issue on `cuweb/rds-2.0`
- **Missing or incorrect icon:** open an issue on `cuweb/rds-icons` (private repo — Carleton devs only)
- **Auth / install problems:** see [rds-icons README → Troubleshooting](https://github.com/cuweb/rds-icons#troubleshooting), then ask in #design-system
- **Architecture questions:** see [ICONS.md](ICONS.md) for the split-repo design rationale
