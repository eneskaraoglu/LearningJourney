# Repository Guidelines

## Project Structure & Module Organization
LearningJourney is a curriculum-style repo with three main tracks:
- `Python/` phased modules (`01-fundamentals/`, `02-intermediate/`, `03-data-analysis/`, `04-machine-learning/`).
- `Frontend/` React modules under `Frontend/React-ClaudeCode/` and `Frontend/React-Codex/`.
- `jquery/` standalone HTML lessons (`01-basics.html` through `07-todo-project.html`).

Module layout follows a consistent pattern:
- `NN-topic-name/01-*-lesson.*`
- `NN-topic-name/02-exercises.*`
- `NN-topic-name/03-solutions.*`
- `sample/` for React modules

## Build, Test, and Development Commands
React modules use Vite. From any `sample/` folder:
- `npm install` installs dependencies.
- `npm run dev` starts the dev server.
- `npm run build` creates a production build.
- `npm run preview` previews the build.
Testing is only configured in some modules (e.g., `Frontend/React-ClaudeCode/08-testing/sample/`):
- `npm test` runs Vitest.
- `npm run test:ui` opens the Vitest UI.
- `npm run test:coverage` generates coverage.

Python modules run directly:
- `python 01-lesson-name.py`
- `python 02-exercises.py`
- `python 03-solutions.py`

jQuery lessons require no build step; open the `.html` files in a browser.

## Coding Style & Naming Conventions
- Use the numbered module naming pattern: `NN-topic-name/`.
- Keep lesson/exercise/solution filenames in the `01-*/02-*/03-*` sequence.
- React samples are plain JSX (not TypeScript).

## Testing Guidelines
- React testing uses Vitest and Testing Library where present.
- Test scripts are per-module; run them from the module’s `sample/` directory.

## Commit & Pull Request Guidelines
Recent commits are short, descriptive summaries without prefixes (e.g., “react codex”, “react basics”). Keep new commit messages in that style.
PRs aren’t formalized here; include a clear description of the learning content added/updated and the module path(s) touched. Add screenshots only when UI output changes.

## Agent-Specific Instructions
See `CLAUDE.md` for AI-assistant guidance on module structure, sequencing, and educational tone.
