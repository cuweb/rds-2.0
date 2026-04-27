# Hybrid themes

**Use this when:** your theme has both classic PHP templates (`single.php`, `page.php`, `header.php`, etc.) and Gutenberg blocks. Icons need to work in both contexts.

The block side follows [blocks-static.md](blocks-static.md) and [blocks-dynamic.md](blocks-dynamic.md) — same patterns as a pure block theme or plugin.

The PHP side needs a `cuweb_icon()` helper that reads SVG files from the shipped `@cuweb/rds-icons` package at render time. That's what this doc is about.

## The PHP helper pattern

The rds-icons package ships raw SVG source files alongside the React components. Its `package.json` declares `"files": ["dist", "src"]`, which means the published npm package contains `src/svg/*.svg` — so PHP can read them directly from `node_modules/`.

### Install

In your theme directory:

```sh
echo "@cuweb:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

### The helper function

Drop this in `functions.php` (or an mu-plugin if you prefer):

```php
<?php
/**
 * Render an inline SVG icon from @cuweb/rds-icons.
 *
 * @param string $name  Icon name (e.g. 'circle-check'). See iconList for all names.
 * @param int    $size  Width and height in pixels. Defaults to 24.
 * @param array  $attrs Additional attributes merged onto the <svg> element.
 *                      Accepts: class, aria-label, title, role.
 * @return string Inline <svg> markup, or empty string if the icon is missing.
 */
function cuweb_icon(string $name, int $size = 24, array $attrs = []): string {
    static $cache = [];

    if (!preg_match('/^[a-z0-9-]+$/', $name)) {
        return '';
    }

    if (isset($cache[$name])) {
        $svg = $cache[$name];
    } else {
        $path = get_theme_file_path('/node_modules/@cuweb/rds-icons/src/svg/' . $name . '.svg');
        if (!file_exists($path)) {
            return '';
        }
        $svg = file_get_contents($path);
        $cache[$name] = $svg;
    }

    $defaults = [
        'width'       => (string) $size,
        'height'      => (string) $size,
        'fill'        => 'currentColor',
        'aria-hidden' => 'true',
        'focusable'   => 'false',
    ];
    $merged = array_merge($defaults, $attrs);

    // If the caller provides an aria-label or title, flip from hidden to role="img"
    if (!empty($attrs['aria-label']) || !empty($attrs['title'])) {
        unset($merged['aria-hidden']);
        $merged['role'] = 'img';
    }

    $attr_string = '';
    foreach ($merged as $key => $value) {
        $attr_string .= ' ' . $key . '="' . esc_attr($value) . '"';
    }

    // Inject the attributes into the opening <svg> tag
    $svg = preg_replace('/<svg([^>]*)>/', '<svg$1' . $attr_string . '>', $svg, 1);

    // If a title was provided, inject a <title> element at the top of the SVG
    if (!empty($attrs['title'])) {
        $title = '<title>' . esc_html($attrs['title']) . '</title>';
        $svg = preg_replace('/(<svg[^>]*>)/', '$1' . $title, $svg, 1);
    }

    return $svg;
}
```

### Usage

```php
<!-- A decorative icon (default: aria-hidden, focusable=false) -->
<?php echo cuweb_icon('circle-check'); ?>

<!-- Explicit size -->
<?php echo cuweb_icon('circle-check', 32); ?>

<!-- Accessible icon with a title -->
<?php echo cuweb_icon('circle-check', 24, ['title' => 'Verified']); ?>

<!-- Extra classes (e.g., for CSS hooks) -->
<?php echo cuweb_icon('circle-check', 24, ['class' => 'cu-hero__icon']); ?>
```

The `echo` is safe — the SVG source comes from a trusted package (rds-icons), not from user input. The helper sanitizes the `name` argument with a regex allow-list before using it as a filename.

### Example in a template

```php
<!-- header.php -->
<header class="site-header">
  <a href="<?php echo esc_url(home_url()); ?>" class="site-logo" aria-label="Home">
    <?php echo cuweb_icon('graduation-cap', 32); ?>
    <span class="site-title"><?php bloginfo('name'); ?></span>
  </a>

  <nav aria-label="Primary">
    <?php wp_nav_menu(['theme_location' => 'primary']); ?>
  </nav>
</header>
```

## Compliance: don't serve `node_modules/` publicly

The helper reads from `/node_modules/@cuweb/rds-icons/src/svg/` — a path inside your theme. By default, your web server **may or may not** serve that path to the public. If it does, anyone can `curl` the SVGs, which violates FA Pro licensing.

**Verify before production:**

```sh
curl -I https://your-site.com/wp-content/themes/your-theme/node_modules/@cuweb/rds-icons/src/svg/circle-check.svg
```

- `200 OK` with SVG body → **not safe, fix this**
- `403 Forbidden` or `404 Not Found` → safe

**Fix options:**

### Option A (recommended): Copy to a controlled assets dir at build

```json
// package.json
{
  "scripts": {
    "build:icons": "mkdir -p assets/icons && cp -R node_modules/@cuweb/rds-icons/src/svg/*.svg assets/icons/",
    "build": "pnpm build:icons && wp-scripts build"
  }
}
```

Update the helper's path:

```php
$path = get_theme_file_path('/assets/icons/' . $name . '.svg');
```

Now you're serving only from `assets/icons/` — a path you control — and you can ship only the icons you actually use by filtering the cp.

### Option B: Apache / nginx config

Add a deny rule for `node_modules`:

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteRule ^(.*/)?node_modules/ - [F,L]
</IfModule>
```

```nginx
location ~ /node_modules/ {
  deny all;
  return 404;
}
```

This protects against accidental exposure but depends on hosting configuration. Option A is more portable.

## Styling

Enqueue the full RDS stylesheet in `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'rds-2.0',
        get_theme_file_uri('/node_modules/@cuweb/rds-2.0/dist/style.css'),
        [],
        filemtime(get_theme_file_path('/node_modules/@cuweb/rds-2.0/dist/style.css'))
    );
});
```

(Or copy to `assets/` at build as shown above for `node_modules/` exposure protection.)

Then tokens like `var(--rds--color-primary)` and `var(--rds--spacing-medium)` are available in all your template CSS.

## Gotchas

### `file_get_contents()` on every request

The `cuweb_icon()` helper as written caches SVG contents in a request-level static `$cache` array, so repeated calls for the same icon on one page hit disk once. For a multi-page site, consider persistent caching (object cache, transients) if icon counts are high.

### Escaping

**Don't** wrap `cuweb_icon()` output in `esc_html()` or `esc_attr()` — those would literally escape the SVG markup into text. The helper outputs trusted HTML from a known-safe source; echo it directly.

### Mixing PHP and block rendering

If the same page has both a PHP template (header.php) using `cuweb_icon()` and Gutenberg blocks using `<Icon>` via save.tsx, that's fine. Both emit inline `<svg>` elements. They compose correctly.

### Version sync

Your helper reads SVGs from `node_modules/` — if you update `@cuweb/rds-icons` to a new version, the SVGs reflect automatically on the next deploy. No manual asset version bumps.

### Accessibility

- If an icon conveys meaning on its own (not paired with text), pass `title` — the helper adds `role="img"` + `<title>`.
- If an icon is purely decorative (paired with text), omit `title` — the helper adds `aria-hidden="true"`.
- Never make it both: `aria-hidden` wins if you set both.
