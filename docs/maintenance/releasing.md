# Releasing

This doc is for maintainers publishing new versions of `@cuweb/rds-2.0` and `@cuweb/rds-icons`.

## The two-package model

```
@cuweb/rds-icons    (private, GitHub Packages)
    ↑ peerDependency
@cuweb/rds-2.0      (public or GitHub Packages — whichever you publish to)
    ↑ dependency
Consumer project
```

You release each package independently. `rds-2.0` declares a version range for `rds-icons` in its `peerDependencies`; consumers install both.

## When to release which

| Change | Release |
|---|---|
| Add/remove/update an icon SVG | `rds-icons` patch or minor |
| Change the generator's output shape | `rds-icons` minor or major |
| Change the `<Icon>` component behavior | `rds-2.0` patch/minor/major |
| Add/change a component in rds-2.0 | `rds-2.0` patch/minor |
| Add new icons that new rds-2.0 features rely on | Coordinated — bump `rds-icons` first, then update rds-2.0's peer dep range, then release rds-2.0 |

## Semver discipline

Both packages follow [Semantic Versioning](https://semver.org/).

- **Patch (0.1.x)** — bug fixes, new icons (additive), doc-only changes. No consumer changes needed.
- **Minor (0.x.0)** — new features (new components, new props), new Pro icons added to the set. No consumer changes required, but consumers may want to adopt.
- **Major (x.0.0)** — breaking changes: renamed/removed components, changed prop signatures, removed icons, changed `IconName` union. Requires consumer migration.

Until either package hits `1.0.0`, treat minor bumps as potentially breaking and read the CHANGELOG carefully.

## Releasing `@cuweb/rds-icons`

### Standard release flow

```sh
cd ~/Develop/personal/rds-icons

# Make your changes (add/remove SVGs, update generator, etc.)
pnpm generate       # regenerate components from SVGs
pnpm typecheck      # sanity check
git add .
git commit -m "feat: add 12 new dashboard icons"

# Bump the version
pnpm version patch  # or 'minor' or 'major' — prints and tags
git push
git push --tags
```

The `pnpm version` command:
- Bumps `package.json` version
- Creates a commit
- Creates a git tag (e.g. `v0.1.1`)

Pushing the tag triggers [.github/workflows/publish.yml](../../../rds-icons/.github/workflows/publish.yml) which:
1. Installs deps
2. Runs the generator + Vite build → `dist/`
3. Publishes to GitHub Packages at `@cuweb/rds-icons@<version>`

### Verify

After the workflow completes (usually < 2 min):

```sh
# Check the GitHub Packages UI
open https://github.com/orgs/cuweb/packages

# Or via CLI
pnpm info @cuweb/rds-icons
```

### Adding or removing icons

1. Drop/delete `.svg` files in `src/svg/`
2. `pnpm generate` (regenerates `src/generated/` and `src/iconList.ts`)
3. If removing icons, note that the `IconName` union shrinks — any consumer code referencing a removed name will fail typecheck. **Removing is breaking**, bump major.
4. Commit the `.svg` changes (generated files are gitignored)
5. Tag and push

### Yanking a bad release

GitHub Packages supports deleting versions:

1. https://github.com/orgs/cuweb/packages/npm/rds-icons/versions
2. Click the bad version → "Delete"

Then release a fixed version. Do not reuse the yanked version number.

## Releasing `@cuweb/rds-2.0`

### Standard release flow

Similar shape:

```sh
cd ~/Develop/personal/rds-2.0

# Make your changes
pnpm build          # run the full library build — verifies everything compiles
pnpm test:storybook # run a11y tests
git add .
git commit -m "feat: add Card component"

# Update CHANGELOG.mdx under [Unreleased], then move those entries under the new version heading
$EDITOR CHANGELOG.mdx

# Bump
pnpm version patch
git push
git push --tags
```

(The publish workflow for rds-2.0 isn't set up in this repo yet. When you add one, it should mirror [rds-icons publish.yml](../../../rds-icons/.github/workflows/publish.yml) but target public npm or GitHub Packages depending on your choice.)

### Updating the `rds-icons` peer dep range

When you release a new `rds-icons` version that adds new icon names the rds-2.0 stories or examples use:

```json
// rds-2.0/package.json
"peerDependencies": {
  "@cuweb/rds-icons": "^0.2.0",
  ...
}
```

The `^` allows consumers to pick up compatible minor/patch bumps. If you ever need an exact version (e.g. during incident response), use `0.2.0` without the caret.

## Coordinated releases

When a change spans both repos (common example: you added icons + a component that uses them):

1. **Land the icon change in rds-icons first**
   - Merge SVGs + tag `rds-icons@v0.x.0`
   - Wait for publish workflow to finish
2. **Update rds-2.0**
   - Bump the peer dep range in `package.json`
   - Use the new icon(s) in the new component
   - `pnpm install` (with auth) to pull the published version and verify
   - Merge + tag `rds-2.0@v0.y.0`

Don't try to publish both simultaneously — rds-2.0's CI needs the published rds-icons to be available when it installs.

### Local development during coordinated work

Working on a change that touches both? Keep the `file:../rds-icons` local link in rds-2.0's devDependencies during development so changes are live immediately. Switch to a versioned range only before the coordinated release.

```json
// During dev (what we have now)
"@cuweb/rds-icons": "file:../rds-icons"

// For release PRs
"@cuweb/rds-icons": "^0.2.0"
```

## Hotfix flow

Something's broken in the latest published version:

1. Create a branch from the failing tag: `git checkout -b hotfix/0.1.1 v0.1.0`
2. Fix the bug, commit
3. `pnpm version patch` (creates `v0.1.1`)
4. Push + push tags → workflow publishes
5. Merge the hotfix branch back to `main`

## Pre-release / canary versions

If you want to test a change without affecting the default install:

```sh
pnpm version prerelease --preid=next  # e.g. 0.2.0-next.0
git push --tags
```

Consumers can opt into the canary with `pnpm add @cuweb/rds-2.0@next`. Default `latest` tag is unaffected.

## CHANGELOG discipline

- Every public change goes in `CHANGELOG.mdx` under `[Unreleased]`
- Entries are prefixed with a keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`
- Before releasing, move the `[Unreleased]` entries under the new version heading with the date
- `_Breaking_` entries **must** coincide with a major version bump
- For rds-icons, `CHANGELOG.md` lives in that repo — same pattern

## Release checklist

Before tagging either repo:

- [ ] All tests pass (`pnpm typecheck`, `pnpm lint`, `pnpm test:storybook` if applicable)
- [ ] CHANGELOG entries are under the new version heading, not `[Unreleased]`
- [ ] Version in `package.json` matches the tag you're about to push
- [ ] If coordinated: the peer dep range in rds-2.0 matches the rds-icons version you want consumers to use
- [ ] FA Pro license compliance (for rds-icons): no new team members added without updating the seat count

## FAQ

**Can I publish from my machine instead of using the workflow?**

Yes. `pnpm publish` after `pnpm build`, provided your `~/.npmrc` has the GitHub Packages auth. But prefer the workflow — it's reproducible, uses a known Node version, and doesn't rely on one person's local setup.

**What if the workflow fails mid-publish?**

Most common cause: the version tag was pushed but the workflow errored before `pnpm publish` completed. Safe to re-run the failed workflow from the Actions UI. If the version was partially published, you'll get an error — delete the broken version from GitHub Packages and re-run.

**Do I need to bump `rds-2.0` every time I bump `rds-icons`?**

No. Consumers can update `rds-icons` independently within the peer range. Only bump `rds-2.0` when its own code changes or the peer range needs to widen.
