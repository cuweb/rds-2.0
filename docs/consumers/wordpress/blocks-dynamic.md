# Dynamic blocks (save + render.php hybrid)

**Use this when:** your block's output depends on server-side data fetched per request — current user, latest posts, dynamic queries — but you still want to include RDS icons.

React doesn't run on PHP request time, so you can't call `<Icon>` from `render.php`. The pattern here is **hybrid save**: `save.tsx` returns just the icon SVG (static), `render.php` receives that SVG as `$content` and wraps it with dynamic markup.

This is our recommended approach because:

- SVG markup stays baked into `post_content` (no node_modules lookup at render time)
- Frontend has zero icon-related overhead
- No FA compliance gotchas — icons never leave React/save serialization
- PHP does only what PHP is good at: composing server-rendered content

## Block scaffold

```
my-plugin/
├── src/
│   └── latest-posts/
│       ├── block.json
│       ├── edit.tsx
│       ├── save.tsx
│       ├── render.php
│       ├── editor.scss
│       └── style.scss
├── package.json
└── .npmrc
```

## block.json

Key fields for dynamic blocks: `"render": "file:./render.php"`. No script entry for the save callback (save returns content at save time only — PHP renders at request time).

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "cuweb/latest-posts",
  "title": "Latest Posts",
  "editorScript": "file:./edit.js",
  "render": "file:./render.php",
  "style": "file:./style.css",
  "editorStyle": "file:./editor.css",
  "attributes": {
    "iconName": { "type": "string", "default": "newspaper" },
    "heading": { "type": "string", "default": "Latest news" },
    "postCount": { "type": "number", "default": 3 }
  }
}
```

## edit.tsx

Nothing special — normal editor UI with RDS components and controls:

```tsx
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { Icon } from '@cuweb/rds-2.0';
import { iconList, type IconName } from '@cuweb/rds-icons';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'cu-latest-posts' });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings">
          <SelectControl
            label="Icon"
            value={attributes.iconName}
            options={iconList}
            onChange={(iconName: IconName) => setAttributes({ iconName })}
          />
          <RangeControl
            label="Number of posts"
            value={attributes.postCount}
            onChange={(postCount) => setAttributes({ postCount })}
            min={1}
            max={10}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="cu-latest-posts__header">
          <Icon name={attributes.iconName} size={24} />
          <RichText
            tagName="h3"
            value={attributes.heading}
            onChange={(heading) => setAttributes({ heading })}
          />
        </div>
        <p className="cu-latest-posts__placeholder">
          Latest {attributes.postCount} posts will render here on the frontend.
        </p>
      </div>
    </>
  );
}
```

## save.tsx — emits ONLY the icon SVG

This is the key step. The save callback returns just the icon — no surrounding dynamic content. That SVG becomes the block's static `post_content`, which render.php receives as `$content`.

```tsx
import { Icon } from '@cuweb/rds-2.0';

export default function Save({ attributes }) {
  return <Icon name={attributes.iconName} size={24} />;
}
```

That's it. Three lines. `save.tsx` is not returning `null` — it's returning the icon specifically so the SVG markup gets baked into the database.

## render.php — wraps the SVG with dynamic content

Gutenberg calls `render_callback` with three arguments: `$attributes`, `$content`, `$block`. The `$content` is whatever `save.tsx` returned, serialized to HTML.

```php
<?php
/**
 * Render callback for cuweb/latest-posts
 */

$icon_svg = $content;  // The icon SVG from save.tsx
$heading  = esc_html($attributes['heading'] ?? '');
$count    = (int) ($attributes['postCount'] ?? 3);

$posts = get_posts([
    'post_type'      => 'post',
    'posts_per_page' => $count,
    'post_status'    => 'publish',
]);

$wrapper_attrs = get_block_wrapper_attributes([
    'class' => 'cu-latest-posts',
]);

?>
<div <?php echo $wrapper_attrs; ?>>
  <div class="cu-latest-posts__header">
    <?php echo $icon_svg; ?>
    <h3><?php echo $heading; ?></h3>
  </div>

  <?php if (!empty($posts)) : ?>
    <ul class="cu-latest-posts__list">
      <?php foreach ($posts as $post) : ?>
        <li>
          <a href="<?php echo esc_url(get_permalink($post)); ?>">
            <?php echo esc_html(get_the_title($post)); ?>
          </a>
          <time datetime="<?php echo esc_attr(get_the_date('c', $post)); ?>">
            <?php echo esc_html(get_the_date('', $post)); ?>
          </time>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php else : ?>
    <p>No posts yet.</p>
  <?php endif; ?>
</div>
```

A few notes on the PHP:

- `echo $icon_svg;` is safe — the SVG was generated by React's SVG renderer from a trusted source (rds-icons). It contains only `<svg>`, `<path>`, and standard attributes. No user input is interpolated into the SVG.
- If you ever *did* add user-influenced content to the saved SVG, sanitize with `wp_kses()` against a strict allow-list of SVG tags.
- `get_block_wrapper_attributes()` merges classes, styles, and block supports (like `align`, `className`). Always use this on your root element.

## What Gutenberg stores

When the block is saved:

```html
<!-- wp:cuweb/latest-posts {"iconName":"newspaper","heading":"Latest news","postCount":5} -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="24" height="24" aria-hidden="true" focusable="false">
  <path d="..." />
</svg>
<!-- /wp:cuweb/latest-posts -->
```

The stored content is *just* the icon. Attributes are in the block comment. On frontend render, PHP reads the SVG from `$content`, pulls the latest posts, and emits the composed HTML.

## Updating which icon is used

Change `iconName` in the editor → `save.tsx` regenerates → the SVG in `post_content` updates. Save the post to commit.

**This is the only time icon SVGs update for existing posts** — you must re-save. If you need retroactive icon updates without re-saving, see the "Stale SVG in old posts" section below.

## Styling

Styles are the same as static blocks — import per-component RDS SCSS:

```scss
// style.scss
@use '@cuweb/rds-2.0/Badge.scss';

.cu-latest-posts {
  padding: var(--rds--spacing-medium);
}

.cu-latest-posts__header {
  display: flex;
  align-items: center;
  gap: var(--rds--spacing-small);
}

.cu-latest-posts__list {
  margin-top: var(--rds--spacing-medium);
  list-style: none;
  padding: 0;
}
```

## Gotchas

### Stale SVG in old posts

If you update FA Pro and a saved icon's SVG path changes, existing posts keep the old SVG. Options:

1. **Re-save posts** (manual, WP-CLI, or a migration script)
2. **Fall back to PHP helper** — instead of using `$content`, look up the SVG from `node_modules/@cuweb/rds-icons/src/svg/` in PHP at render time (see [hybrid-themes.md](hybrid-themes.md) for the `cuweb_icon()` helper pattern). Use this if retroactive updates matter more than zero-render-cost.

### `<Icon>` adds focusable="false" and aria-hidden

These are appropriate for decorative icons. If your dynamic block needs an *accessible* icon (conveys meaning), pass a `title` prop in save.tsx:

```tsx
<Icon name={attributes.iconName} size={24} title={attributes.iconLabel} />
```

This renders `role="img"` + `<title>` into the SVG, which survives the save serialization.

### Block deprecation on save.tsx changes

Same gotcha as static blocks: changing the serialized save output breaks existing post content. If you change how the icon is rendered (size, attributes, wrapper), add a block deprecation. Usually not an issue for tiny save functions like this one.

### `$content` is empty

If `save.tsx` returns `null` (the default dynamic-block scaffold from `create-block`), `$content` is an empty string. Make sure your `save.tsx` actually returns the `<Icon>` — not `null`.

## When NOT to use this pattern

- **Block has no icon needed** — just return `null` from save.tsx, do everything in render.php
- **You need retroactive icon updates across all posts** without re-saving — use the PHP helper pattern from [hybrid-themes.md](hybrid-themes.md) and read the SVG from disk at render time
- **Block is fully static, no server data** — use [blocks-static.md](blocks-static.md) instead; dynamic rendering is unnecessary overhead
