# Automation

Reusable Copilot prompts and per-file instruction sets that standardize common workflows for this repo.

## Copilot instructions (loaded automatically)

These files are picked up by GitHub Copilot in VS Code / JetBrains based on the file you're editing. No manual setup.

| File | Scope | Purpose |
|---|---|---|
| [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) | All files | Project overview, tech stack, naming conventions, changelog format |
| [`.github/instructions/components.instructions.md`](../../.github/instructions/components.instructions.md) | `src/components/**/*.tsx` | Component file structure, exports, subcomponents, class naming |
| [`.github/instructions/stories.instructions.md`](../../.github/instructions/stories.instructions.md) | `**/*.stories.tsx` | Story patterns, args, argTypes, a11y overrides |
| [`.github/instructions/styles.instructions.md`](../../.github/instructions/styles.instructions.md) | `**/*.scss` | Token usage, BEM, responsive mixins, file locations |

The `.instructions.md` files are the canonical conventions for the repo — see also [docs/contributing/conventions.md](../contributing/conventions.md), which summarizes and links here.

## Reusable prompts

Invoked from Copilot Chat with `#prompt-name`. Each is a repeatable workflow with built-in safeguards.

| Prompt | File | Purpose |
|---|---|---|
| `#update-changelog` | [`.github/prompts/update-changelog.prompt.md`](../../.github/prompts/update-changelog.prompt.md) | Scans branch commits, adds entries to `CHANGELOG.mdx` under `[Unreleased]` |
| `#create-release` | [`.github/prompts/create-release.prompt.md`](../../.github/prompts/create-release.prompt.md) | Creates `release/{version}` branch, bumps version, moves changelog entries, commits, merges, tags, pushes |

### `#update-changelog`

Scans committed changes on the current branch and adds entries to `CHANGELOG.mdx` under `## [Unreleased]`.

**Prerequisites**

- Working tree must be clean (the prompt bails on uncommitted changes)
- Branch should have commits ahead of `main`

**Entry format**

Each entry is prefixed with a keyword in italics:

- `_Added_` — new features or components
- `_Changed_` — modifications to existing functionality
- `_Fixed_` — bug fixes
- `_Removed_` — removed features or code
- `_Deprecated_` — features marked for future removal
- `_Breaking_` — breaking changes
- `_Security_` — security-related changes

### `#create-release`

Creates a release branch, updates version and changelog, commits, merges to `main`, tags, pushes.

**Prerequisites**

- Must be on `main`
- Working tree must be clean
- `## [Unreleased]` in `CHANGELOG.mdx` should have entries to move

**Workflow**

```
main (clean) → pull → create release/{version} → bump version
             → move [Unreleased] entries under [{version}]
             → commit → merge to main → tag v{version} → push
```

See [releasing.md](releasing.md) for the broader release process this prompt automates one slice of.

## Adding a new prompt

1. Create `.github/prompts/<name>.prompt.md` with step-by-step instructions
2. Add the prompt + a one-line description to the table above
3. If the prompt has prerequisites or non-obvious failure modes, document them in this doc
