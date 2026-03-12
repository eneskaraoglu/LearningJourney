# Flutter Learning Journey

## Goal
- Learn Flutter as a production-minded UI toolkit, not just a widget catalog.
- Build confidence in layout, state, navigation, forms, data access, testing, and performance.
- Finish the journey able to create, debug, and extend medium-sized mobile apps with clean structure.

## Who This Track Is For
- Learners who already know basic Dart and want to build mobile apps.
- Web or backend developers moving into cross-platform app development.
- Flutter beginners who want a structured path instead of random tutorial hopping.

## Prerequisite
- Complete the Dart learning journey first, or arrive with equivalent comfort in Dart syntax, classes, null safety, and async programming.

## Recommended Outcome
By the end of this journey, you should be able to:
- Build Flutter UIs from widgets, layouts, and reusable components.
- Manage user interaction, form input, navigation, async loading, and local persistence.
- Structure features so UI, state, and data access remain understandable as the app grows.
- Test critical behavior and diagnose common performance or rebuild issues.

## Study Order

### Phase 1: Fundamentals
Work through these modules in sequence:
1. `01-fundamentals/01-flutter-setup`
2. `01-fundamentals/02-project-structure`
3. `01-fundamentals/03-widgets-basics`
4. `01-fundamentals/04-layouts`
5. `01-fundamentals/05-navigation`

Focus areas:
- SDK setup, emulator/device workflow, hot reload, and debugging basics
- Understanding `lib/`, `main.dart`, assets, pubspec, and feature-oriented organization
- Stateless vs stateful widgets and composition over giant screens
- Row, Column, Stack, ListView, Expanded, Flexible, and constraint-driven layout thinking
- Screen-to-screen navigation, route arguments, and predictable app flow

Deliverable:
- Build a simple multi-screen app such as notes, tasks, or recipe browsing with clean layout and navigation.

### Phase 2: Intermediate App Development
Work through these modules in sequence:
1. `02-intermediate/01-state-management`
2. `02-intermediate/02-forms-validation`
3. `02-intermediate/03-networking-api`
4. `02-intermediate/04-local-storage`
5. `02-intermediate/05-theming`

Focus areas:
- Choosing practical state patterns before jumping to complex architecture
- Managing text input, validation, error messages, and submit states
- Calling APIs, parsing JSON, handling loading/errors, and keeping UI responsive
- Persisting local settings, drafts, or cached data
- Creating consistent app theming, typography, and reusable visual language

Deliverable:
- Upgrade the Phase 1 app with editable forms, remote data, local persistence, and a coherent theme system.

### Phase 3: Advanced App Engineering
Work through these modules in sequence:
1. `03-advanced/01-bloc-pattern`
2. `03-advanced/02-performance`
3. `03-advanced/03-animations`
4. `03-advanced/04-testing`

Focus areas:
- Separating presentation, events, state transitions, and business logic with BLoC-style thinking
- Avoiding unnecessary rebuilds, oversized widget trees, jank, and image/layout waste
- Using purposeful animations to improve comprehension and polish
- Writing widget tests, unit tests, and targeted integration checks for important flows

Deliverable:
- Refactor the app into a feature-based structure with predictable state flow, tests, and a performance pass.

## Milestones
1. Milestone 1: You can build and navigate a small app without copy-pasting blindly.
2. Milestone 2: You can manage form input, validation, and API calls with clear loading/error states.
3. Milestone 3: You can explain when a widget rebuilds and how to reduce unnecessary work.
4. Milestone 4: You can ship a polished project structure that another developer can maintain.

## Suggested Project Path

### Mini Project 1: Task Tracker
- Multiple screens: list, detail, create/edit
- Local state plus validation
- Empty, loading, and error UI states

### Mini Project 2: Weather or Recipe Browser
- Remote API fetch with retry-aware UI
- Search/filter controls
- Local favorites or recently viewed persistence

### Capstone Project: Personal Productivity App
- Authentication mock or gated onboarding flow
- Dashboard, details, create/edit forms, and settings
- Local caching, robust error handling, reusable theme, and test coverage for critical user flows

## Common Failure Patterns
- Building huge `build()` methods that mix UI, state, and networking logic.
- Fighting Flutter layout rules instead of understanding constraints.
- Calling APIs directly from widgets without an isolation layer.
- Forgetting loading, empty, retry, and validation states.
- Using advanced state libraries too early without understanding the problem they solve.
- Ignoring rebuild behavior until the app becomes slow and fragile.

## Practice Rules
- Rebuild sample screens from memory after each module.
- Use the Flutter inspector whenever layout behavior surprises you.
- Keep feature folders small and intention-revealing.
- Test both happy paths and failure states for form and API screens.
- After each milestone, explain your architecture decisions out loud or in notes.

## Production Checklist
- Clear feature folder boundaries
- Consistent error and loading UI
- Input validation before save/submit actions
- Async cancellation or stale-state awareness where needed
- Reusable theming tokens instead of hardcoded colors everywhere
- Baseline widget tests for critical screens

## Weekly Plan
- Week 1: Setup, project structure, widgets, layouts
- Week 2: Navigation and state management
- Week 3: Forms, API integration, local storage
- Week 4: Theming, architecture cleanup, performance
- Week 5: Animations, testing, capstone finish

## How To Use This Track With The Existing Folders
- `01-fundamentals/` is your base layer. Do not skip it.
- `02-intermediate/` is where app behavior becomes realistic.
- `03-advanced/` is where maintainability and production quality start to matter.
- `projects/mini-projects/` should hold guided builds once you begin implementing apps.
- `projects/capstone-project/` should be reserved for the final integrated application.
- `notes/` can store your debugging checklists, widget lifecycle notes, and architecture summaries.

## Exit Criteria
- You can build a small Flutter app from scratch without tutorial-by-tutorial dependency.
- You can organize features, state, and data flow in a way that remains readable.
- You can debug common layout, async, and rebuild issues with the right tools.
- You can discuss tradeoffs between simplicity, scalability, and testability in a Flutter codebase.
