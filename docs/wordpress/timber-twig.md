# Timber + Twig themes

**Use this when:** your theme renders with [Timber](https://timber.github.io/), using Twig templates in `views/` and controllers in PHP.

Timber doesn't change the icon consumption model — it's still server-side PHP rendering. The `cuweb_icon()` helper from [hybrid-themes.md](hybrid-themes.md) does the work; Timber just exposes it to Twig via a custom function or filter.

Read [hybrid-themes.md](hybrid-themes.md) first if you haven't — this doc builds on the same helper.

## Install

Same as hybrid themes:

```sh
echo "@cuweb:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

Copy the `cuweb_icon()` helper from [hybrid-themes.md](hybrid-themes.md#the-helper-function) into `functions.php` or a theme include.

## Expose `cuweb_icon()` to Twig

Timber integrates with Twig's extension API. Register a Twig function in `functions.php`:

```php
<?php
// functions.php

use Timber\Timber;

add_filter('timber/twig', function (\Twig\Environment $twig) {
    $twig->addFunction(new \Twig\TwigFunction(
        'icon',
        function (string $name, int $size = 24, array $attrs = []) {
            return cuweb_icon($name, $size, $attrs);
        },
        ['is_safe' => ['html']]
    ));

    return $twig;
});
```

A few details:

- **`is_safe => ['html']`** — tells Twig not to escape the return value. The SVG markup is trusted (from rds-icons, sanitized inside the helper), so we want it emitted as-is.
- **Function vs filter** — using `addFunction` lets you call `{{ icon('name') }}`. If you prefer pipe syntax, register a filter with `addFilter` and call `{{ 'name' | icon }}`.
- **Multiple args** — Twig passes arguments positionally, so `{{ icon('circle-check', 32) }}` and `{{ icon('circle-check', 32, {'title': 'Check'}) }}` both work.

## Usage in Twig templates

```twig
{# views/header.twig #}
<header class="site-header">
  <a href="{{ site.url }}" class="site-logo" aria-label="Home">
    {{ icon('graduation-cap', 32) }}
    <span>{{ site.name }}</span>
  </a>

  <nav aria-label="Primary">
    {{ fn('wp_nav_menu', { theme_location: 'primary' }) }}
  </nav>
</header>
```

```twig
{# views/single-post.twig #}
<article>
  <header>
    <h1>{{ post.title }}</h1>
    <p class="byline">
      {{ icon('user', 16) }}
      <a href="{{ post.author.link }}">{{ post.author.name }}</a>
      <time datetime="{{ post.date('c') }}">
        {{ icon('calendar-clock', 16) }}
        {{ post.date }}
      </time>
    </p>
  </header>

  <div class="content">
    {{ post.content }}
  </div>
</article>
```

## Named args (nicer for Twig)

Twig 3.8+ supports named arguments. This reads cleaner when you need a title:

```twig
{{ icon('circle-check', size=20, attrs={'title': 'Verified'}) }}
```

To support this, update the PHP function signature to accept named defaults (already does — PHP 8+ named arguments work implicitly with Twig's positional-to-named mapping).

## Alternative: filter syntax

If your team prefers piping:

```php
add_filter('timber/twig', function (\Twig\Environment $twig) {
    $twig->addFilter(new \Twig\TwigFilter(
        'icon',
        function (string $name, int $size = 24, array $attrs = []) {
            return cuweb_icon($name, $size, $attrs);
        },
        ['is_safe' => ['html']]
    ));

    return $twig;
});
```

Then in Twig:

```twig
{{ 'circle-check' | icon }}
{{ 'circle-check' | icon(32) }}
{{ 'circle-check' | icon(32, {'title': 'Verified'}) }}
```

Pick whichever style matches your team's conventions. Don't register both — pick one pattern and stick with it.

## Passing icon names from controllers

Timber controllers often assemble a `$context` array for the template. You can pass icon names through cleanly:

```php
// single-event.php
$context = Timber::context();
$event = Timber::get_post();

$context['post']       = $event;
$context['icon_name']  = $event->meta('event_type') === 'workshop' ? 'pen-ruler' : 'calendar-clock';

Timber::render('single-event.twig', $context);
```

```twig
{# views/single-event.twig #}
<article class="event">
  <h1>{{ icon(icon_name, 32) }} {{ post.title }}</h1>
</article>
```

## Enqueue the stylesheet

Same as hybrid themes — enqueue `@cuweb/rds-2.0/dist/style.css` from `functions.php`. See [hybrid-themes.md → Styling](hybrid-themes.md#styling).

## Gotchas

### `is_safe` is required

If you register the function without `'is_safe' => ['html']`, Twig auto-escapes the SVG markup into literal text (`&lt;svg...&gt;`). This is a common first-time mistake. The function author (you) is vouching that the output is safe — make sure it really is, which in our case it is (trusted source, filtered `name`).

### Path assumptions inside `cuweb_icon()`

The helper uses `get_theme_file_path()` which assumes the SVGs are inside the theme. If you move them to a plugin (shared helper across themes), adjust the path:

```php
$path = plugin_dir_path(__FILE__) . 'node_modules/@cuweb/rds-icons/src/svg/' . $name . '.svg';
```

Or pass a configurable base directory.

### Twig environment caching

Timber caches compiled Twig templates. When you change the function registration, the cache should invalidate — but if you see the old behavior, clear `/wp-content/cache/timber/` or equivalent.

### Don't repeat Twig's default escaping rules

Don't do `{{ icon(name) | escape }}` or `{{ icon(name) | e }}` — that double-escapes. Just `{{ icon(name) }}`, which trusts the `is_safe` declaration.

### Missing icons

If a controller passes an icon name that doesn't exist in rds-icons, the helper returns an empty string. Twig renders nothing — no error. Validate names in the controller if your template relies on an icon being present.
