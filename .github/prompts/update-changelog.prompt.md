# Update Changelog

Update `CHANGELOG.mdx` based on recent committed changes.

## Important

Do NOT use the terminal. Use the `get_changed_files` tool to see what changed and read the changed files directly to understand the changes. Only use file reading and editing tools — never run git commands in the terminal.

## Steps

1. Use the `get_changed_files` tool to get the list of files that have changed
2. If there are no changes, tell the user there's nothing new to add
3. Read the changed files to understand what was added, changed, or fixed
4. Read `CHANGELOG.mdx` and add entries under `## [Unreleased]` based on the changes
5. Each entry must be prefixed with a keyword: `_Added_`, `_Changed_`, `_Fixed_`, `_Removed_`, `_Deprecated_`, `_Breaking_`, `_Security_`
6. Write concise, specific entries — reference component names in backticks
