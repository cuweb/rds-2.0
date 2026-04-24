# Icons setup

One-time auth setup each developer needs in order to `pnpm install` this repo.

`rds-2.0` depends on `@cuweb/rds-icons`, which is a private package on GitHub Packages. Without auth, `pnpm install` will fail with `ERR_PNPM_FETCH_401 Unauthorized`.

## 1. Create a Personal Access Token

**With `gh` CLI (easiest):**

```sh
gh auth refresh --scopes read:packages
echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> ~/.npmrc
```

Done. Skip to step 2.

**Manually:**

1. Go to https://github.com/settings/tokens
2. **Generate new token → Generate new token (classic)**
3. Name it `cuweb-packages`, pick an expiration
4. Check the **`read:packages`** scope only
5. Generate and copy the `ghp_...` token
6. Add to your user-level `~/.npmrc`:

```sh
echo "//npm.pkg.github.com/:_authToken=ghp_your_token_here" >> ~/.npmrc
```

## 2. Install

```sh
cd rds-2.0
pnpm install
```

Should complete without the 401 error. You're done.

## For reference

What this looks like in this repo after setup:

**`.npmrc` (committed at the repo root):**

```
@cuweb:registry=https://npm.pkg.github.com
```

**`package.json` (the icons dependency):**

```json
{
  "peerDependencies": {
    "@cuweb/rds-icons": "^0.1.0"
  },
  "devDependencies": {
    "@cuweb/rds-icons": "^0.1.0"
  }
}
```

- `peerDependencies` tells consumers of `@cuweb/rds-2.0` they also need `@cuweb/rds-icons` installed
- `devDependencies` pulls it in locally so TypeScript and the build can resolve the imports

**`~/.npmrc` (your user-level file, not committed):**

```
//npm.pkg.github.com/:_authToken=ghp_your_token_here
```

This is the one that needs to exist on your machine. It's what step 1 above creates.

## 3. Troubleshooting

| Error | Fix |
|---|---|
| `ERR_PNPM_FETCH_401 Unauthorized` | Step 1 wasn't completed, or the token expired. Regenerate. |
| `ERR_PNPM_FETCH_404 Not Found` on `@cuweb/rds-icons` | Project's `.npmrc` is missing the scope config — this shouldn't happen in rds-2.0 (it's committed), but if the file got deleted, restore `@cuweb:registry=https://npm.pkg.github.com` |
| Token expired mid-session | Same as 401 — generate a new token, replace the line in `~/.npmrc` |

## When to rotate

When your PAT expires (based on the expiration you picked in step 1), regenerate and replace the line in `~/.npmrc`. When you leave the team, revoke the token at https://github.com/settings/tokens.
