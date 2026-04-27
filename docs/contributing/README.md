# Contributing to RDS 2.0

Docs for developers working on the library itself. If you're using `@cuweb/rds-2.0` in a project rather than building it, you want the [consumers/](../consumers/) section.

## Start here

| Doc | When to read |
|---|---|
| [local-setup.md](local-setup.md) | First time on a new machine — Node, pnpm, GitHub Packages auth, clone, install |
| [architecture.md](architecture.md) | Understand the two-package icon model, token pipeline, build outputs, Storybook setup |
| [conventions.md](conventions.md) | Component / story / SCSS file conventions; adding a new component |
| [testing.md](testing.md) | `pnpm typecheck`, `pnpm lint`, `pnpm test:storybook`, a11y, husky hooks |
| [ai-context.md](ai-context.md) | Bootstrap snippet for AI sessions outside Copilot Chat |

## How conventions are enforced

The canonical conventions live in [`.github/instructions/`](../../.github/instructions/) and are auto-loaded by GitHub Copilot per file glob:

| File | Applies to |
|---|---|
| [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) | All files |
| [`.github/instructions/components.instructions.md`](../../.github/instructions/components.instructions.md) | `src/components/**/*.tsx` |
| [`.github/instructions/stories.instructions.md`](../../.github/instructions/stories.instructions.md) | `**/*.stories.tsx` |
| [`.github/instructions/styles.instructions.md`](../../.github/instructions/styles.instructions.md) | `**/*.scss` |

[conventions.md](conventions.md) summarizes these for human reading and links back to each canonical file.

## Workflow

1. Branch from `main`
2. Make changes (run `pnpm dev` to see them in Storybook)
3. Add a `## [Unreleased]` entry to [`CHANGELOG.mdx`](../../CHANGELOG.mdx) — see [maintenance/automation.md](../maintenance/automation.md) for the `#update-changelog` Copilot prompt
4. `pnpm typecheck && pnpm lint && pnpm test:storybook` (the husky hooks will catch most of this anyway)
5. Open a PR

For releases, see [maintenance/releasing.md](../maintenance/releasing.md).
