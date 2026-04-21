# Automation

This project uses GitHub Copilot instructions and reusable prompts to standardize common workflows. This document provides an overview of what's available and how it's organized.

## Copilot Instructions

Instructions are loaded automatically based on the file you're working in. No manual setup needed.

| File | Scope | Purpose |
|------|-------|---------|
| `.github/copilot-instructions.md` | All files | Project overview, tech stack, naming conventions, changelog format |
| `.github/instructions/components.instructions.md` | `src/components/**/*.tsx` | Component file structure, export patterns, subcomponents, class naming |
| `.github/instructions/stories.instructions.md` | `**/*.stories.tsx` | Story patterns, args style, argTypes controls, a11y overrides |
| `.github/instructions/styles.instructions.md` | `**/*.scss` | Token usage, BEM naming, responsive mixins, file locations |

## Reusable Prompts

Prompts are invoked in the Copilot chat panel by typing `#prompt-name`. Each prompt is a repeatable workflow with built-in safeguards.

| Prompt | Command | Description |
|--------|---------|-------------|
| [Update Changelog](changelog.md) | `#update-changelog` | Scans branch commits and updates `CHANGELOG.mdx` |
| [Create Release](release.md) | `#create-release` | Creates a release branch, updates version and changelog, commits and pushes |

## Adding New Prompts

1. Create a new file in `.github/prompts/` with the naming convention `task-name.prompt.md`
2. Write step-by-step instructions that Copilot will follow
3. Add a corresponding doc in `docs/automation/` explaining the workflow
4. Update this README with the new entry
