# Static blocks (save.tsx)

**Use this when:** your custom block's markup is fully known at save time — no server-side data, no per-request rendering. This is the simplest Gutenberg pattern and should be your default.

The save callback returns JSX that Gutenberg serializes to HTML once, stores in `post_content`, and the frontend emits as-is. No React runs on the frontend. No PHP needed.

## Block scaffold

A typical static block has three files:

```
my-plugin/
├── src/
│   └── info-card/
│       ├── block.json
│       ├── edit.tsx
│       ├── save.tsx
│       ├── editor.scss   (editor-only styles)
│       └── style.scss    (frontend styles)
├── package.json
└── .npmrc
```

## block.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "cuweb/info-card",
  "title": "Info Card",
  "editorScript": "file:./edit.js",
  "script": "file:./save.js",
  "style": "file:./style.css",
  "editorStyle": "file:./editor.css",
  "attributes": {
    "iconName": { "type": "string", "default": "circle-check" },
    "title": { "type": "string", "default": "" },
    "body": { "type": "string", "default": "" }
  }
}
```

## edit.tsx

```tsx
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Icon } from '@cuweb/rds-2.0';
import { iconList, type IconName } from '@cuweb/rds-icons';

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps({ className: 'cu-info-card' });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Icon">
          <SelectControl
            label="Icon"
            value={attributes.iconName}
            options={iconList}
            onChange={(iconName: IconName) => setAttributes({ iconName })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <Icon name={attributes.iconName} size={32} />
        <RichText
          tagName="h3"
          value={attributes.title}
          onChange={(title) => setAttributes({ title })}
          placeholder="Card title"
        />
        <RichText
          tagName="p"
          value={attributes.body}
          onChange={(body) => setAttributes({ body })}
          placeholder="Card body"
        />
      </div>
    </>
  );
}
```

## save.tsx

```tsx
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@cuweb/rds-2.0';

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save({ className: 'cu-info-card' });

  return (
    <div {...blockProps}>
      <Icon name={attributes.iconName} size={32} />
      <RichText.Content tagName="h3" value={attributes.title} />
      <RichText.Content tagName="p" value={attributes.body} />
    </div>
  );
}
```

## What Gutenberg stores in the database

When an editor saves the post, Gutenberg calls `save()`, serializes the returned JSX to HTML, and stores it in `post_content` as a block comment:

```html
<!-- wp:cuweb/info-card {"iconName":"circle-check","title":"Accessible","body":"..."} -->
<div class="wp-block-cuweb-info-card cu-info-card">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="32" height="32" aria-hidden="true" focusable="false">
    <path d="M256 32a224 224 0 1 1 0 448..." />
  </svg>
  <h3>Accessible</h3>
  <p>...</p>
</div>
<!-- /wp:cuweb/info-card -->
```

The SVG is **fully inlined** — the frontend just emits this block of HTML with no icon lookup, no React runtime, no per-request cost.

## Styling

Import the per-component RDS styles you want to reuse, plus your block-specific SCSS:

```scss
// style.scss — frontend styles
@use '@cuweb/rds-2.0/Badge.scss';

.cu-info-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--rds--spacing-medium);
  padding: var(--rds--spacing-medium);
  background: var(--rds--color-grey-pale);
  border-radius: var(--rds--radius-md);
}
```

The tokens (`--rds--*`) are available anywhere the RDS stylesheet has been enqueued — typically the theme or a sitewide plugin loads `@cuweb/rds-2.0/styles`.

## Gotchas

- **Block deprecation when you change save.tsx output:** editing `save.tsx` changes the serialized HTML. Existing posts with the old HTML will show "Block contains unexpected or invalid content" in the editor. Handle with [block deprecation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/).
- **Icon updates don't retroactively apply:** if FA releases a new version of `circle-check.svg`, existing posts keep the old SVG in their `post_content`. Re-saving the post picks up the new SVG. This is standard Gutenberg behavior.
- **`<Icon>` renders a real `<svg>`:** no wrapper span or div. `useBlockProps` gives you the element to spread block props onto — apply it to your container, not the icon.

## Build

@wordpress/scripts bundles edit.tsx and save.tsx via webpack. The resulting bundle imports from `@cuweb/rds-2.0` and `@cuweb/rds-icons` as external packages — tree-shaking picks up only the icons you use.

```json
// package.json
{
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start"
  },
  "devDependencies": {
    "@wordpress/scripts": "^30.0.0"
  },
  "dependencies": {
    "@cuweb/rds-2.0": "^0.2.0",
    "@cuweb/rds-icons": "^0.1.0"
  }
}
```

No special webpack config needed.

## When not to use this pattern

Move to [blocks-dynamic.md](blocks-dynamic.md) if:

- Block output depends on per-request server data (current user, latest posts, dynamic queries)
- You need to reflect icon updates retroactively without re-saving posts
- Your block is rendered server-side for search indexing reasons
