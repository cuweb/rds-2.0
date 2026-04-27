# Installation

How to install `@cuweb/rds-2.0` and its peer dependency `@cuweb/rds-icons` in any consumer project.

## Prerequisites

You need GitHub Packages authentication before `pnpm install` will succeed — `@cuweb/rds-icons` is a private package. Set up auth once per machine:

1. Follow the [rds-icons README → Developer onboarding](https://github.com/cuweb/rds-icons#developer-onboarding-one-time)
2. That writes a `_authToken` line to your user-level `~/.npmrc`

For CI, see [CI authentication](#ci-authentication) below.

## 1. Add the scope config

Create or edit `.npmrc` at your project root:

```
@cuweb:registry=https://npm.pkg.github.com
```

Commit this file. It tells pnpm/npm to look for `@cuweb/*` packages on GitHub Packages, not the public npm registry. It does **not** contain any secrets.

## 2. Install both packages

```sh
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

`rds-icons` is a peer dependency of `rds-2.0` — your package manager will warn if only one is installed.

## 3. Import styles

Once, near the top of your application:

```tsx
import '@cuweb/rds-2.0/styles';
```

This imports the full bundled stylesheet — design tokens, base element styles, and every component's CSS. For per-component CSS instead, see [per-component-css.md](per-component-css.md).

## 4. Use components

```tsx
import { Badge, Button, Icon } from '@cuweb/rds-2.0';

<Badge text="New" color="green" />
<Button title="Get started" icon="circle-check" />
<Icon name="calendar-clock" size={24} />
```

For Next.js-specific setup including `LinkProvider`, see [nextjs.md](nextjs.md).

## CI authentication

Your deploy pipeline also needs to pull from GitHub Packages. See the [rds-icons README → CI authentication](https://github.com/cuweb/rds-icons#ci-authentication) for the workflow snippet.

## Troubleshooting

| Error | Fix |
|---|---|
| `ERR_PNPM_FETCH_401 Unauthorized` | Auth not set up, or token expired — repeat step 1 of the rds-icons onboarding |
| `ERR_PNPM_FETCH_404 Not Found` on `@cuweb/rds-icons` | Project's `.npmrc` is missing the scope config — re-add `@cuweb:registry=https://npm.pkg.github.com` |

For deeper diagnosis, see the [rds-icons README → Troubleshooting](https://github.com/cuweb/rds-icons#troubleshooting).
