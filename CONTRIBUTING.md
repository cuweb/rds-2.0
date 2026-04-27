# Contributing to RDS 2.0

Thanks for your interest in contributing to Carleton University's design system.

The full contributor documentation lives in [`docs/contributing/`](docs/contributing/). Start at [`docs/contributing/README.md`](docs/contributing/README.md).

## Quick links

- **First time on a new machine?** → [local setup](docs/contributing/local-setup.md)
- **Understanding the project layout?** → [architecture](docs/contributing/architecture.md)
- **Conventions for components / stories / styles?** → [conventions](docs/contributing/conventions.md) (canonical: [`.github/instructions/`](.github/instructions/))
- **Running tests?** → [testing](docs/contributing/testing.md)
- **Cutting a release?** → [maintenance/releasing](docs/maintenance/releasing.md)

## Quick start

```sh
nvm use
pnpm install
pnpm dev          # Storybook at http://localhost:6006
```

If `pnpm install` fails with `ERR_PNPM_FETCH_401`, you need GitHub Packages auth — see [local setup → step 1](docs/contributing/local-setup.md#1-authenticate-to-github-packages).

## Pre-flight before opening a PR

```sh
pnpm typecheck
pnpm lint
pnpm test:storybook
```

The husky hooks run these automatically on commit and push. Don't bypass with `--no-verify` — fix the underlying issue.

## Changelog

Add a `## [Unreleased]` entry to [`CHANGELOG.mdx`](CHANGELOG.mdx) for any user-visible change. Entries are prefixed with a keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`.

Copilot users can run `#update-changelog` — see [maintenance/automation](docs/maintenance/automation.md).
