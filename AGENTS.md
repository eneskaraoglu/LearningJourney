# LearningJourney Agent Guide (Software Development Scope)

## Purpose
This repository is a curriculum-driven learning system for software development.
Agents must create high-quality, detailed learning content, not shallow notes.

The expected output style is:
- Deep lessons with structured sections and practical context
- Extended exercises with progressive difficulty
- Complete reference solutions with production-style patterns
- Runnable `sample/` projects for hands-on practice

## Curriculum Scope
Content should teach software development progressively across:
- Fundamentals (language, tooling, problem-solving)
- Application Development (API/UI, data, testing)
- Production Engineering (architecture, security, observability, deployment)

When adding new tracks (Node, Python, Java, Frontend, etc.), keep this same educational structure and depth.

## Standard Module Structure
Every module must follow this structure:
- `NN-topic-name/01-<topic>-lesson.md`
- `NN-topic-name/02-exercises.<js|py|md>`
- `NN-topic-name/03-solutions.<js|py|md>`
- `NN-topic-name/sample/` (when runnable project is relevant)

Numbering and naming are mandatory:
- Folder naming: `NN-topic-name/` (example: `04-http-express-basics/`)
- File sequence must always stay `01`, `02`, `03`

## Lesson Depth Requirements (`01-...-lesson.md`)
Every lesson file must include all sections below:
- `Module Info` (level, duration, prerequisites)
- `Learning Outcomes`
- `Deep Dive` (multiple concept subsections)
- `Worked Example` (real code snippet)
- `Common Pitfalls`
- `Debugging Checklist`
- `Step-by-Step Practice Plan`
- `Mini Project Task`
- `Interview Q&A`
- `Exit Criteria`

Quality bar:
- Explanations must be specific and implementation-oriented
- Avoid generic theory-only content
- Connect concepts to real project behavior and failures

## Exercise Depth Requirements (`02-exercises.*`)
Exercises must be multi-stage and explicit.
Minimum structure:
- `Part A` (core implementation)
- `Part B` (validation/error cases)
- `Part C` (reliability/refactor or advanced flow)
- `Constraints`
- `Acceptance Criteria`
- `Bonus Challenge`
- `Reflection Prompts`

Quality bar:
- Tasks must be achievable but non-trivial
- Include negative-path requirements (validation, error handling)
- Require clean code structure, not just “make it work”

## Solution Requirements (`03-solutions.*`)
Solutions must be complete references, not minimal hints.
Expected characteristics:
- Clear function/module boundaries
- Input validation and meaningful error handling
- Consistent response contracts for APIs
- Comments only where needed for complex logic
- Production-minded patterns appropriate to module level

Where relevant, include:
- Middleware patterns
- Service/repository separation
- Retry/timeout logic
- Logging/metrics hooks

## Runnable Sample Requirements (`sample/`)
If a module or phase includes runnable code, provide:
- `package.json` (or equivalent runtime config)
- `README.md` with setup and run instructions
- `.env.example` when env vars are needed
- `src/` entrypoint and supporting files

Samples must:
- Run locally with documented commands
- Reflect module concepts in realistic form
- Be readable and safe for learners to extend

## Existing Repository Tracks
Current major areas include:
- `Python/`
- `Frontend/React-ClaudeCode/`
- `Frontend/React-Codex/`
- `jquery/`
- `Java-codex/`
- `Node-codex/`

Agents may expand these tracks or add new ones, but must preserve naming and structure conventions in this document.

## Build, Test, and Run Conventions
For Node/Frontend sample projects:
- `npm install`
- `npm run dev`
- `npm run start` or `npm start`
- `npm test` when tests exist

For Python modules:
- `python 01-...py`
- `python 02-exercises.py`
- `python 03-solutions.py`

For HTML/jQuery modules:
- Open files directly in browser unless otherwise specified

## Content Authoring Rules for Agents
- Keep ASCII by default
- Prefer concise, precise technical writing
- Do not break numbering conventions
- Do not create placeholder-only files
- Do not submit shallow lessons/exercises/solutions
- Preserve existing user changes unless explicitly asked to overwrite

## Validation Checklist Before Finishing
Before marking work complete, confirm:
- Folder/file naming follows `NN-*` pattern
- All three core files exist (`01`, `02`, `03`)
- Lessons meet required section depth
- Exercises include acceptance criteria and bonus tasks
- Solutions compile or pass basic syntax checks where applicable
- Sample project instructions are accurate and runnable

## Commit Guidance
Commit messages should remain short, descriptive, and plain (no prefixes), aligned with repository history style.
When sharing changes, include:
- What was added/updated
- Which module paths were touched
- Whether run/syntax checks were executed
