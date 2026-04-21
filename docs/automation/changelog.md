# Update Changelog

**Prompt:** `#update-changelog`

Scans committed changes on the current branch and adds entries to `CHANGELOG.mdx` under `## [Unreleased]`.

## Prerequisites

- All changes must be committed — the prompt will stop if there are uncommitted changes
- The branch should have commits ahead of `main`

## What It Does

1. Checks for uncommitted changes — bails if the working tree is dirty
2. Runs `git log main..HEAD` to find commits on the current branch
3. Reviews the actual diffs to understand what changed
4. Adds entries to `CHANGELOG.mdx` under `## [Unreleased]`
5. Skips entries that already exist in the changelog

## Entry Format

Each entry is prefixed with a keyword in italics:

- `_Added_` — new features or components
- `_Changed_` — modifications to existing functionality
- `_Fixed_` — bug fixes
- `_Removed_` — removed features or code
- `_Deprecated_` — features marked for future removal
- `_Breaking_` — breaking changes
- `_Security_` — security-related changes

## Example Output

```markdown
## [Unreleased]

- _Added_: `Column` layout component with `cols` prop and responsive grid breakpoints
- _Changed_: Page layout story to use `Main` component instead of raw markup
- _Fixed_: SCSS mixin injection for Vitest config
```
