# Create Release

Create a release branch, update version and changelog, commit and push.

## Steps

1. Run `git branch --show-current` to verify you are on `main`
   - **If not on main**, stop and tell the user:
     > You must be on the `main` branch to create a release. Run `git checkout main` first.
   - Do not proceed further.

2. Run `git status --short` to check for uncommitted changes
   - **If there are uncommitted changes**, stop and tell the user:
     > You have uncommitted changes. Please commit or stash your work first.
   - Do not proceed further.

3. Run `git pull` to ensure main is up to date

4. Ask the user for the release version number (e.g. `0.3.0`)

5. Create and checkout a new branch: `git checkout -b release/{version}`

6. Update the `version` field in `package.json` to the new version number

7. Update `CHANGELOG.mdx`:
   - Read the current entries under `## [Unreleased]`
   - Insert a new heading `## [{version}]` between `## [Unreleased]` and the existing entries
   - Move all unreleased entries under the new version heading
   - Leave `## [Unreleased]` empty (ready for future work)

8. Commit the changes: `git add --all && git commit -m "release: {version}"`

9. Push the branch: `git push --set-upstream origin release/{version}`

10. Tell the user the release branch is ready for a PR into main
