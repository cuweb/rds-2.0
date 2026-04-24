# Block themes

**Use this when:** you're building a pure block theme — all templates are block-based (`.html` files in `templates/` and `parts/`), no classic PHP templates, no query loop in PHP.

Icons in a block theme come from three places, each with a different integration:

1. **Custom blocks** rendered by editors → follow [blocks-static.md](blocks-static.md) or [blocks-dynamic.md](blocks-dynamic.md)
2. **Theme-authored inline SVG** in template parts → copy the SVG markup from `node_modules/@cuweb/rds-icons/src/svg/` directly into the template
3. **Theme block patterns** that need icons → use RDS components through a registered block, or inline SVG

This doc covers the theme-level integration (#2 and #3) and the stylesheet setup.

## Prerequisites

- Block theme scaffold (either hand-rolled or from `create-block-theme`)
- `theme.json` configured
- Node toolchain available for the build step (`@wordpress/scripts` or similar)

If your theme has no JS/build step at all, jump to [Minimal-tooling variant](#minimal-tooling-variant) below.

## Install

In the theme directory:

```sh
echo "@cuweb:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

## Enqueuing the RDS stylesheet

```php
<?php
// functions.php

add_action('wp_enqueue_scripts', function () {
    $rds_style = get_theme_file_path('/node_modules/@cuweb/rds-2.0/dist/style.css');
    if (!file_exists($rds_style)) {
        return;
    }
    wp_enqueue_style(
        'rds-2.0',
        get_theme_file_uri('/node_modules/@cuweb/rds-2.0/dist/style.css'),
        [],
        filemtime($rds_style)
    );
});
```

Or, more robust for production — copy the stylesheet into `assets/` at build time so you're not serving `node_modules/` publicly.

```json
// package.json build script
{
  "scripts": {
    "build:rds-css": "cp node_modules/@cuweb/rds-2.0/dist/style.css assets/rds-style.css"
  }
}
```

```php
// functions.php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'rds-2.0',
        get_theme_file_uri('/assets/rds-style.css'),
        [],
        filemtime(get_theme_file_path('/assets/rds-style.css'))
    );
});
```

## theme.json integration

If you also want the WordPress Site Editor to expose RDS design tokens as presets (so authors pick from `var(--rds--color-primary)` in the color palette), `@troychaplin/component2block` generates a compatible `theme.json`. The cuweb setup exports it to `dist/cutheme/theme.json` — merge that into your theme's `theme.json` at build time, or require it via PHP.

See `dist/cutheme/integrate.php` in the `rds-2.0` package for a drop-in integration helper.

## Inline SVG in a template part

If you want an icon in `parts/header.html` or similar, inline the SVG. Copy the contents from `node_modules/@cuweb/rds-icons/src/svg/<name>.svg` directly into the template part:

```html
<!-- parts/header.html -->
<!-- wp:html -->
<a class="cu-header__home" href="/" aria-label="Home">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="24" height="24" aria-hidden="true">
    <path d="M263.5 119.1..." />
  </svg>
</a>
<!-- /wp:html -->
```

This is the simplest pattern for one-off icons in theme chrome. For anything repeated across many templates, prefer a custom block (see below).

## Exposing icons to pattern authors via a block

If editors need to insert an RDS icon anywhere, register a tiny `cuweb/icon` block in a theme-adjacent plugin (or an mu-plugin inside the theme). The block pattern follows [blocks-static.md](blocks-static.md) — save.tsx emits the icon, frontend gets the SVG for free.

Simplified icon-only block:

```tsx
// src/icon-block/save.tsx
import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@cuweb/rds-2.0';

export default function Save({ attributes }) {
  return (
    <span {...useBlockProps.save({ className: 'cu-icon-block' })}>
      <Icon name={attributes.iconName} size={attributes.size ?? 24} />
    </span>
  );
}
```

Editors drop this block into theme block patterns. The icon bakes into the pattern's stored HTML.

## Block patterns shipped with the theme

Block patterns are arrays of block comments + HTML in your theme's `patterns/` directory. Because they're just HTML, you include SVGs directly:

```php
<?php
/**
 * Title: Card with icon
 * Slug: cuweb/card-with-icon
 * Categories: featured
 */
?>

<!-- wp:group {"className":"cu-info-card"} -->
<div class="wp-block-group cu-info-card">
  <!-- wp:html -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="32" height="32" aria-hidden="true">
    <path d="M256 32..." />
  </svg>
  <!-- /wp:html -->

  <!-- wp:heading {"level":3} -->
  <h3>Accessible design</h3>
  <!-- /wp:heading -->

  <!-- wp:paragraph -->
  <p>Card body text here.</p>
  <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

When a user inserts the pattern, the SVG lands in their post_content as-is.

## Minimal-tooling variant

If your block theme has no JS build step (pure `.html` + `theme.json` + `functions.php`):

1. **Don't install via pnpm** — download `@cuweb/rds-2.0/dist/style.css` from GitHub Packages via the Releases UI, or copy from another project's `node_modules/`
2. **Place it in `assets/`** alongside other theme stylesheets
3. **Enqueue from `functions.php`** (see snippet above but pointing at the assets path)
4. **Copy SVG markup manually** from the rds-icons `src/svg/` directory into templates — you won't have access to the npm package locally without installing it once

This is the minimum-viable integration. Works fine for themes that only need the stylesheet + tokens; not great if you'll want icons in many places.

## Gotchas

- **Serving `node_modules/` publicly** is possible on misconfigured web servers. If you ever reference `get_theme_file_uri('/node_modules/...')`, audit that the path isn't denied in production. See the compliance checklist in [ICONS.md](../ICONS.md#fa-pro-license-compliance-checklist).
- **`theme.json` merging** is one-way: the generated cuweb theme.json is a starting point, not a live dependency. Re-merge on RDS updates.
- **Pattern HTML is static**: if you update an icon's SVG source, existing usages of your pattern keep the old HTML. Same as static-block gotcha — this is WordPress, not a CDN.
