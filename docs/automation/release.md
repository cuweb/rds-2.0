# Create Release

**Prompt:** `#create-release`

Creates a release branch, updates the version number and changelog, then commits and pushes.

## Prerequisites

- Must be on the `main` branch
- Working tree must be clean (no uncommitted changes)
- `## [Unreleased]` in `CHANGELOG.mdx` should have entries to move

## What It Does

1. Verifies you're on `main` with a clean working tree — bails if not
2. Pulls the latest changes from origin
3. Asks for a version number (e.g. `0.3.0`)
4. Creates and checks out `release/{version}` branch
5. Updates the `version` field in `package.json`
6. Moves `[Unreleased]` changelog entries under a new `[{version}]` heading
7. Commits: `release: {version}`
8. Pushes the branch to origin

## Workflow

```
main (clean) → pull latest → create release/0.3.0 → update files → commit → push
```

After the prompt completes, open a PR from `release/{version}` into `main`. Once merged, tag the release.

## What Gets Updated

### package.json

```json
{
  "version": "0.3.0"
}
```

### CHANGELOG.mdx

Before:
```markdown
## [Unreleased]

- _Added_: New component
- _Fixed_: Build issue
```

After:
```markdown
## [Unreleased]

## [0.3.0]

- _Added_: New component
- _Fixed_: Build issue
```
