# Local setup

How to get a working dev environment for contributing to `@cuweb/rds-2.0`.

## Prerequisites

- **Node 22.14+** — pinned in [`.nvmrc`](../../.nvmrc). Run `nvm use` from the repo root.
- **pnpm 10.x** — declared in `packageManager` of [`package.json`](../../package.json). Install via `corepack enable` or follow [pnpm's install docs](https://pnpm.io/installation).
- **`gh` CLI** (recommended) for the GitHub Packages auth step below.
- Carleton org membership on GitHub (required to install the private `@cuweb/rds-icons` peer dep).

## 1. Authenticate to GitHub Packages

`@cuweb/rds-icons` is a private package on GitHub Packages. Without auth, `pnpm install` fails with `ERR_PNPM_FETCH_401 Unauthorized`.

**With `gh` CLI (easiest):**

```sh
gh auth refresh --scopes read:packages
echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
```

That writes a token line to your user-level `~/.npmrc`. Done.

**Manually:**

1. Go to https://github.com/settings/tokens
2. **Generate new token → Generate new token (classic)**
3. Name it `cuweb-packages`, pick an expiration, scope: `read:packages` only
4. Copy the `ghp_...` token
5. Add to your user-level `~/.npmrc`:

```sh
echo "//npm.pkg.github.com/:_authToken=ghp_your_token_here" >> ~/.npmrc
```

## 2. Clone and install

```sh
git clone git@github.com:cuweb/rds-2.0.git
cd rds-2.0
nvm use
pnpm install
```

The repo's [`.npmrc`](../../.npmrc) (committed) tells pnpm to look for `@cuweb/*` packages on GitHub Packages — it pairs with your `~/.npmrc` token.

## 3. Run Storybook

```sh
pnpm dev
```

Storybook starts at http://localhost:6006. The `dev` script runs `pnpm assets` + `pnpm c2b` first to ensure generated files (asset config + design tokens) are current.

## Optional: clone rds-icons locally

For most contribution work you don't need this — `pnpm install` pulls the published `rds-icons` package. Clone the companion repo only if you need to **change icons** as part of your work, or test unreleased icon changes.

```sh
cd ~/Develop/personal           # or wherever you keep repos
git clone git@github.com:cuweb/rds-icons.git
cd rds-icons
pnpm install
pnpm generate                   # regenerate components from SVGs
```

To use the local checkout in rds-2.0, switch the dep in [`package.json`](../../package.json) from a version range to a `file:` link:

```jsonc
"devDependencies": {
  "@cuweb/rds-icons": "file:../../rds-icons"
}
```

Then `pnpm install` in rds-2.0 to pick up the symlink. **Don't commit the `file:` change** — switch back to the version range before opening a PR.

`rds-icons` points its `main`/`module`/`types`/`exports` at `src/` during local dev (no build step needed). Re-run `pnpm generate` in rds-icons after editing SVGs and reload Storybook to see changes.

## Verify your setup

```sh
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint over src/
pnpm test           # Vitest run
pnpm test:storybook # Vitest + a11y axe checks across all stories (Node 22+ required)
```

The last command is what the [pre-push hook](../../.husky/pre-push) runs — make sure it passes locally before pushing.

## Hooks

[Husky](https://typicode.github.io/husky/) runs two hooks via [`pnpm prepare`](../../package.json):

- **pre-commit** ([`.husky/pre-commit`](../../.husky/pre-commit)) — `pnpm lint && pnpm typecheck`
- **pre-push** ([`.husky/pre-push`](../../.husky/pre-push)) — `pnpm test:storybook`

If a hook fails, fix the underlying issue rather than skipping with `--no-verify`.

## Troubleshooting

| Error | Fix |
|---|---|
| `ERR_PNPM_FETCH_401 Unauthorized` | Step 1 wasn't completed, or the token expired. Regenerate. |
| `ERR_PNPM_FETCH_404 Not Found` on `@cuweb/rds-icons` | Project's `.npmrc` is missing the scope config — restore `@cuweb:registry=https://npm.pkg.github.com` |
| `pnpm test:storybook` hangs or fails on Node < 22 | Install Node 22.14 (`nvm install 22.14.0 && nvm use`) |
| `pnpm c2b` errors about missing `c2b.config.json` | You're not in the repo root, or the file was deleted — restore from git |

For deeper authentication issues, see the [rds-icons README → Troubleshooting](https://github.com/cuweb/rds-icons#troubleshooting).

## When to rotate tokens

When your PAT expires (based on the expiration you picked in step 1), regenerate and replace the line in `~/.npmrc`. When you leave the team, revoke the token at https://github.com/settings/tokens.
