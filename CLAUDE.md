# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

LearningJourney is a personal learning repository structured as a progressive curriculum covering Python, jQuery, and React. This is an educational codebase where content is organized into self-contained learning modules, each following a consistent pattern of lessons, exercises, and solutions.

## Architecture

### Module Organization Pattern

All learning content follows a standardized structure:

```
NN-topic-name/
├── 01-topic-name-lesson.md    # Theory and concepts
├── 02-exercises.{js,py}        # Practice problems
├── 03-solutions.{js,py}        # Reference answers
└── sample/                     # Working project (React only)
```

### Three Learning Tracks

**Python Track** (`Python/`)
- Organized in 4 phases: Fundamentals (complete), Intermediate (complete), Data Analysis, Machine Learning
- Each phase contains numbered modules (01-module-name/, 02-module-name/, etc.)
- Phases 1-2 are complete; Phase 3 is ready to start
- Uses standard Python with external packages (numpy, pandas, matplotlib, scikit-learn) for later phases

**React Track** (`Frontend/React/`)
- 14 modules covering basics through authentication
- Each module includes a `sample/` directory with a complete Vite+React project
- `_starter/` directory provides base Vite+React template for new exercises
- Recently started (only basics covered so far)

**jQuery Track** (`jquery/`)
- 7 self-contained HTML files (01-basics.html through 07-todo-project.html)
- No build system - open files directly in browser
- Complete and ready for reference

## Development Commands

### React Development

```bash
# Navigate to any React module's sample directory
cd Frontend/React/NN-topic/sample/

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Python Development

```bash
# Navigate to any Python module
cd Python/0N-phase-name/NN-module-name/

# Run a lesson file
python 01-lesson-name.py

# Run exercises
python 02-exercises.py

# Run solutions
python 03-solutions.py

# For data analysis modules (Phase 3+), install dependencies first:
pip install numpy pandas matplotlib seaborn scikit-learn
```

### jQuery Development

```bash
# Simply open any HTML file in a browser
# No build system or dependencies required
```

## Key Technical Details

### React Setup (Vite)
- Uses React 18.2.0 with React Router 6.22.0
- Vite 5.0.12 for build tooling
- Testing configured with @testing-library/react and Vitest
- All React projects use JSX (not TypeScript)

### Python Configuration
- Standard Python 3.x (no virtual environment configured yet)
- Module 05 in Intermediate phase covers virtual environments
- Data files stored in `Python/01-fundamentals/07-file-io/data/*.csv`

### Git Workflow
- Main branch: `main`
- Recent activity shows commits at module/topic completion milestones
- All files currently tracked (no .gitignore configured)

## Navigation Tips

**When adding new React content:**
- Use `Frontend/React/_starter/` as the template
- Maintain the NN-topic-name/01-lesson/02-exercises/03-solutions pattern
- Each module's sample/ should be a complete, runnable project

**When adding new Python content:**
- Follow the phase-based organization (01-fundamentals/, 02-intermediate/, etc.)
- Keep modules focused and self-contained
- Include practical exercises with real-world datasets where applicable

**Current learning status:**
- Python: Phases 1-2 complete, Phase 3 ready to start
- React: Just started with basics
- jQuery: Complete reference material

## Notes for AI Assistants

- This is a learning repository, not a production codebase
- Maintain consistency with existing naming conventions (NN-topic-name/)
- Exercises should be challenging but achievable for someone learning the topic
- Solutions should include explanatory comments for educational value
- React modules build on previous concepts progressively
- Python phases have dependencies: Phase 3 requires numpy/pandas, Phase 4 requires scikit-learn
