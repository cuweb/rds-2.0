# Update Changelog

Update `CHANGELOG.mdx` based on recent committed changes.

## Steps

1. Run a single terminal command to gather all git context at once:
   `git status --short && echo "---LOG---" && git log main..HEAD --oneline && echo "---DIFF---" && git diff main..HEAD`
2. If `git status` shows uncommitted changes, stop and tell the user to commit first
3. If there are no commits ahead of main, tell the user there's nothing new to add
4. Read `CHANGELOG.mdx` and add entries under `## [Unreleased]` based on the diff output
5. Each entry must be prefixed with a keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`
6. Write concise, specific entries — reference component names in backticks
9. Do not duplicate entries that already exist in the changelog
10. Group related changes into single entries where appropriate
