# WordPress integration

Using `@cuweb/rds-2.0` components (and `@cuweb/rds-icons`) inside WordPress projects. This directory has a doc for each common scenario.

## Prerequisites

All WordPress projects follow the base consumer setup:

1. [Set up GitHub Packages auth](https://github.com/cuweb/rds-icons#developer-onboarding-one-time) (one-time per machine)
2. Add `.npmrc` with `@cuweb:registry=https://npm.pkg.github.com` in the project root
3. `pnpm add @cuweb/rds-2.0 @cuweb/rds-icons`

See [the consumer guide](../README.md) for the full install flow.

## Pick the scenario that matches your project

| If you're building… | Read |
|---|---|
| A custom block whose save markup is static HTML | [blocks-static.md](blocks-static.md) |
| A custom block rendered server-side via `render.php` | [blocks-dynamic.md](blocks-dynamic.md) |
| A block theme (no classic PHP templates) | [block-themes.md](block-themes.md) |
| A hybrid theme (classic PHP templates + blocks) | [hybrid-themes.md](hybrid-themes.md) |
| A Timber theme with Twig templates | [timber-twig.md](timber-twig.md) |

Some projects span multiple scenarios — a site might have a block theme with custom dynamic blocks and a Timber-based admin plugin. In that case, each layer follows its own doc.

## The underlying principle

Gutenberg has two rendering modes, and icon consumption differs between them:

- **Static blocks** (save.tsx returns full JSX): `<Icon>` renders once at save time, serializes to SVG HTML, and is stored in `post_content`. The frontend emits pre-rendered HTML — no React runtime needed.
- **Dynamic blocks** (render.php): the React component can't run on PHP request time. We use a hybrid save pattern where save.tsx returns just the icon SVG, and render.php wraps that server-side with dynamic content.

Everything else (block themes, hybrid themes, Timber) is a choice of where and how the frontend renders — the two modes above cover the icon integration. PHP-only templates that don't go through a block use a small `cuweb_icon()` PHP helper that reads SVGs from the shipped package.

## The FA Pro compliance reminder

The rds-icons package ships raw SVG files in addition to generated TSX. When your PHP code reads from `node_modules/@cuweb/rds-icons/src/svg/`, make sure your web server **does not** expose `node_modules/` publicly. Test with `curl` before shipping. See [the icons guide](../icons.md#fa-pro-license-compliance-checklist) for the full compliance checklist.
