# Update Changelog

Update `CHANGELOG.mdx` based on recent committed changes.

## Mode

Run all git commands and file edits autonomously without asking for confirmation. Do not pause for approval between steps.

## Steps

1. Run `git status --short` to check for uncommitted changes
2. **If there are uncommitted changes**, stop and tell the user:
   > You have uncommitted changes. Please commit your work first, then run this prompt again.
   Do not proceed further.
3. If the working tree is clean, run `git log main..HEAD --oneline` to get the list of commits on the current branch
4. If there are no commits ahead of main, tell the user there's nothing new to add
5. For each commit, review the diff with `git diff main..HEAD --stat` and `git diff main..HEAD` to understand what actually changed
6. Open `CHANGELOG.mdx` and add entries under `## [Unreleased]`
7. Each entry must be prefixed with a keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`
8. Write concise, specific entries — reference component names in backticks
9. Do not duplicate entries that already exist in the changelog
10. Group related changes into single entries where appropriate
