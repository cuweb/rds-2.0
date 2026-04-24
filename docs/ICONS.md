# Icons

Icons in the Raven Design System are split across **two packages** for Font Awesome Pro license compliance.

## TL;DR

- `<Icon>` component lives in this repo (`@cuweb/rds-2.0`, public)
- Icon **data** (212 FA Pro SVGs as typed React components) lives in `@cuweb/rds-icons` (private, GitHub Packages)
- To consume icons, install both and authenticate to `npm.pkg.github.com`

```sh
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

```tsx
import { Icon } from '@cuweb/rds-2.0';
<Icon name="circle-check" size={24} />
```

## Why two packages?

### The license constraint

Font Awesome Pro's license ([fontawesome.com/license](https://fontawesome.com/license)) prohibits:

1. Distributing standalone copies of Pro Icons to non-Creators
2. Giving non-Creators permission to embed Pro Icons in their own projects

Carleton's FA Pro Organization license covers Carleton developers as "Creators," but **not** the general public who might `npm install` rds-2.0.

If we baked FA Pro SVGs into `rds-2.0` and published it publicly, anyone could install it and get the Pro Icons — which violates the license. The same applies to serving the SVGs from a public CDN.

### The solution

Split the icons out. `rds-2.0` ships public, but contains **no Pro Icon data**. The Icon data lives in a private companion package (`rds-icons`) published to GitHub Packages, which requires Carleton authentication to install.

Anyone can install `rds-2.0` — but the `<Icon>` component won't resolve without `rds-icons` being present at install time. The GitHub Packages auth gate is what enforces license compliance.

## Architecture

```
┌─────────────────────────────┐        ┌─────────────────────────────┐
│ @cuweb/rds-2.0 │        │ @cuweb/rds-icons│
│          (PUBLIC)           │        │          (PRIVATE)          │
│                             │        │                             │
│ - Icon component            │ ◂──────│ - iconMap                   │
│ - IconProps                 │  peer  │ - IconName                  │
│ - Button w/ icon prop       │   dep  │ - CircleCheckIcon, etc.     │
│ - Stories                   │        │ - iconList (Gutenberg)      │
│                             │        │ - FA Pro SVG sources        │
└─────────────────────────────┘        └─────────────────────────────┘
         Public npm (or GH Packages)          GitHub Packages (private)
```

**Key files here in rds-2.0:**

- [`src/components/Icon/Icon.tsx`](../src/components/Icon/Icon.tsx) — the `<Icon>` component. Imports `iconMap` and `IconName` from the peer package.
- [`src/components/Icon/Icon.stories.tsx`](../src/components/Icon/Icon.stories.tsx) — stories demonstrating all four color approaches and the full icon grid.

**Not in this repo (moved to `rds-icons`):**

- FA Pro SVG source files
- `scripts/generate-icons.mjs` (generator)
- Generated icon components
- `iconList` for Gutenberg

**Peer dependency declaration** in [`package.json`](../package.json):

```json
"peerDependencies": {
  "@cuweb/rds-icons": "^0.1.0",
  ...
}
```

## Consumer setup

### 1. GitHub Packages authentication

Every consumer project needs a `.npmrc` at the project root (or home) pointing the `@cuweb` scope at GitHub Packages and providing a token:

```
@cuweb:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

The `GITHUB_TOKEN` env var must be a personal access token (classic) with `read:packages` scope, or a fine-grained token with Packages read permission on the `cuweb` organization.

In CI, use `${{ secrets.GITHUB_TOKEN }}` (the default provided by GitHub Actions).

### 2. Install

```sh
pnpm add @cuweb/rds-2.0 @cuweb/rds-icons
```

Both packages must be installed. rds-2.0 declares rds-icons as a peer dependency, so package managers will warn if only rds-2.0 is present.

### 3. Use

Three import styles, depending on what you're doing:

```tsx
// Central component API (recommended default)
import { Icon } from '@cuweb/rds-2.0';
<Icon name="circle-check" size={24} />

// Named icon imports (best tree-shaking for Next.js)
import { CircleCheckIcon } from '@cuweb/rds-icons';
<CircleCheckIcon width={24} height={24} />

// Icon name list for Gutenberg block controls
import { iconList } from '@cuweb/rds-icons';
// → [{ value: 'circle-check', label: 'Circle check' }, ...]
```

## Development (working on rds-2.0 locally)

If you're working on `rds-2.0` itself (not consuming it), you need `rds-icons` checked out locally and linked:

```sh
# One-time: clone the private companion repo (requires Carleton org membership)
cd ~/Develop/personal
git clone git@github.com:cuweb/rds-icons.git

# In rds-icons, generate icons so TypeScript can resolve them
cd rds-icons
pnpm install
pnpm generate
```

The `rds-2.0` `package.json` has `"@cuweb/rds-icons": "file:../rds-icons"` as a devDependency, so `pnpm install` in `rds-2.0` will symlink the local checkout.

If your repo layout differs from `~/Develop/personal/{rds-2.0,rds-icons}`, update the `file:` path in `package.json` (do not commit the change).

### rds-icons local dev mode

`rds-icons` points its `main`/`module`/`types`/`exports` at `src/` during local development (no build needed). When published, `publishConfig` overrides those fields to point at `dist/`.

This lets you work on icons and immediately see changes in rds-2.0's Storybook without a build step — just re-run `pnpm generate` in rds-icons.

## Publishing

### rds-icons (private)

See [rds-icons README](https://github.com/cuweb/rds-icons#publishing). Publishes to GitHub Packages with the `@cuweb` scope.

### rds-2.0 (public)

rds-2.0 can be published to either public npm or GitHub Packages. The build does **not** bake any FA Pro data into the output — all icon references are externalized via the peer dependency.

## Adding or changing icons

Changes happen in the `rds-icons` repo:

1. Add/remove `.svg` files in `rds-icons/src/svg/`
2. Run `pnpm generate` in rds-icons
3. Test in rds-2.0 storybook (the file-linked dep picks up changes immediately)
4. Commit the `.svg` changes in rds-icons (generated files are gitignored)
5. Version bump and publish rds-icons
6. Update rds-2.0's peer dep range if needed and publish

## FA Pro license compliance checklist

When onboarding or offboarding team members:

- ✅ New team member: add to FA Pro seat count BEFORE granting `cuweb/rds-icons` repo access
- ✅ Departing team member: remove `cuweb/rds-icons` repo access AND remove from FA Pro seat count
- ✅ Never make `cuweb/rds-icons` public
- ✅ Never mirror FA Pro SVGs to a publicly-readable CDN, S3 bucket, or other storage
- ✅ Audit the legacy `cu-production.s3.amazonaws.com/rds/assets/font-awesome/` path — if public, restrict it

The existing production S3 bucket used by the old RDS may already be out of compliance (publicly readable Pro SVGs). Audit and restrict if necessary.

## Related

- [`@cuweb/rds-icons`](https://github.com/cuweb/rds-icons) — the private companion repo
- [FA Pro license](https://fontawesome.com/license) — authoritative terms
- [FA docs: using a package manager](https://docs.fontawesome.com/web/setup/packages) — includes: *"Making the files in Font Awesome Pro packages publicly available violates your Pro license."*
