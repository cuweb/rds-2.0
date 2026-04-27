# Consuming the Raven Design System

This section is for Carleton developers using `@cuweb/rds-2.0` in their projects.

## Quick start

```sh
# 1. One-time per machine: GitHub Packages auth
#    (see: rds-icons README → Developer onboarding)

# 2. In your project
echo "@cuweb:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

```tsx
import { Button, Icon } from '@cuweb/rds-2.0';
import '@cuweb/rds-2.0/styles';

<Button title="Save" icon="floppy-disk" />
```

## What's in this section

| Doc | When to read |
|---|---|
| [installation.md](installation.md) | Setting up `.npmrc`, installing both packages, CI authentication |
| [nextjs.md](nextjs.md) | Using RDS in a Next.js app, including `LinkProvider` for client-side routing |
| [icons.md](icons.md) | The `<Icon>` component, import styles, the two-package model |
| [per-component-css.md](per-component-css.md) | Importing one component's CSS instead of the bundled stylesheet |
| [wordpress/](wordpress/) | WordPress block plugins, block themes, hybrid themes, Timber/Twig — pick the scenario that matches your project |

## Background

`@cuweb/rds-2.0` ships with `@cuweb/rds-icons` as a peer dependency. Both packages must be installed. Authentication for GitHub Packages is required because rds-icons is private by design — see [icons.md](icons.md) for the reason.

If you haven't set up auth yet, start at the [rds-icons README → Developer onboarding](https://github.com/cuweb/rds-icons#developer-onboarding-one-time) (~2 minutes), then come back here.

## Updating

```sh
pnpm up @cuweb/rds-2.0 @cuweb/rds-icons
```

Check the [CHANGELOG](../../CHANGELOG.mdx) for breaking changes before bumping major versions.

## Removing

```sh
pnpm remove @cuweb/rds-2.0 @cuweb/rds-icons
```

Also remove the `@cuweb:registry=...` line from `.npmrc` (unless other `@cuweb/*` packages are in use) and any `import '@cuweb/rds-2.0/styles'` references.

## Getting help

- **Bug in a component:** open an issue on [`cuweb/rds-2.0`](https://github.com/cuweb/rds-2.0/issues)
- **Missing or incorrect icon:** open an issue on `cuweb/rds-icons` (private repo — Carleton devs only)
- **Auth / install problems:** see the [rds-icons README → Troubleshooting](https://github.com/cuweb/rds-icons#troubleshooting), then ask in #design-system
- **Architecture questions:** see [icons.md](icons.md) for the split-repo design rationale
