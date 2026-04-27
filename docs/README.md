# Documentation

Docs are organized by audience. Pick the section that matches what you're trying to do.

## I want to **use** RDS in my project

→ [**consumers/**](consumers/) — installation, Next.js integration, icons, per-component CSS, WordPress (block plugins, block themes, hybrid themes, Timber/Twig)

The Storybook site at https://cuweb.github.io/rds-2.0/ is the primary consumer reference; this folder is the deeper-dive companion.

## I want to **contribute** to RDS

→ [**contributing/**](contributing/) — local setup, architecture, file conventions, testing, AI session bootstrapping

If you're using GitHub Copilot in this repo, the conventions in [`.github/instructions/`](../.github/instructions/) load automatically by file glob.

## I'm a **maintainer**

→ [**maintenance/**](maintenance/) — releasing (both packages), branch protection, automation prompts

## Looking for something specific?

| Topic | Where |
|---|---|
| Install RDS in a Next.js app | [consumers/installation.md](consumers/installation.md) → [consumers/nextjs.md](consumers/nextjs.md) |
| Use RDS in a WordPress block | [consumers/wordpress/blocks-static.md](consumers/wordpress/blocks-static.md) (or `blocks-dynamic.md`) |
| Why icons live in a separate package | [contributing/architecture.md#two-package-icon-model](contributing/architecture.md#two-package-icon-model) |
| Add a new component to the library | [contributing/conventions.md#adding-a-new-component](contributing/conventions.md#adding-a-new-component) |
| Run tests / accessibility checks | [contributing/testing.md](contributing/testing.md) |
| Cut a release | [maintenance/releasing.md](maintenance/releasing.md) |
| Use a Copilot prompt (`#update-changelog`, `#create-release`) | [maintenance/automation.md](maintenance/automation.md) |
| Bootstrap an AI session outside Copilot | [contributing/ai-context.md](contributing/ai-context.md) |

## Archive

[archive/todos/](archive/todos/) holds early planning docs whose work has shipped — kept for historical context only.
