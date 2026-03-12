# Dart Learning Journey

## Goal
- Build strong Dart fundamentals before moving into Flutter app development.
- Learn the language the way it is used in production: null safety, async flows, typed collections, and maintainable object models.
- Finish the track ready to write small CLI tools, package-level business logic, and Flutter app services with confidence.

## Who This Track Is For
- Beginners who want to learn Dart as a first typed language.
- Flutter learners who keep getting blocked by Dart syntax and async behavior.
- Developers coming from JavaScript, Java, or Python who want a focused Dart ramp-up.

## Recommended Outcome
By the end of this journey, you should be able to:
- Read and write idiomatic Dart without treating it like JavaScript or Java.
- Model business rules with classes, constructors, interfaces, and mixins.
- Debug null-safety, `Future`, and `Stream` issues without guessing.
- Write reusable pure-Dart logic that can later plug into Flutter applications.

## Study Order

### Phase 1: Fundamentals
Work through these modules in sequence:
1. `01-fundamentals/01-variables`
2. `01-fundamentals/02-data-types`
3. `01-fundamentals/03-control-flow`
4. `01-fundamentals/04-functions`
5. `01-fundamentals/05-collections`

Focus areas:
- Variable declaration with `var`, explicit types, `final`, and `const`
- Primitive and core types: `int`, `double`, `String`, `bool`
- Branching and loops with readable conditions
- Function signatures, named parameters, optional parameters, and return types
- Lists, sets, maps, iteration patterns, and collection transformation

Deliverable:
- Build a small console-based tracker such as expense logging, task management, or score keeping.

### Phase 2: Object-Oriented Dart
Work through these modules in sequence:
1. `02-oop/01-classes`
2. `02-oop/02-constructors`
3. `02-oop/03-inheritance`
4. `02-oop/04-interfaces`
5. `02-oop/05-mixins`

Focus areas:
- Encapsulating data and behavior inside classes
- Choosing between default, named, factory, and redirecting constructors
- Using inheritance carefully instead of creating rigid class hierarchies
- Defining contracts with abstract classes and interfaces
- Reusing behavior with mixins without forcing inappropriate inheritance

Deliverable:
- Refactor the Phase 1 console project into layered objects such as models, services, validators, and repositories.

### Phase 3: Advanced Language Features
Work through these modules in sequence:
1. `03-advanced/01-null-safety`
2. `03-advanced/02-async-await`
3. `03-advanced/03-streams`
4. `03-advanced/04-generics`

Focus areas:
- Non-nullable by default design and safe nullable handling
- `Future`, `async`, `await`, exception flow, and timeout thinking
- Event streams, listeners, and stream transformations
- Generic classes and functions that stay type-safe and reusable

Deliverable:
- Build a command-line data sync simulation with validation, async I/O boundaries, and typed repository abstractions.

## Milestones
1. Milestone 1: You can solve beginner syntax problems without searching every keyword.
2. Milestone 2: You can model real data with classes and constructors cleanly.
3. Milestone 3: You can explain null safety and async behavior with examples.
4. Milestone 4: You can write reusable pure-Dart modules that are ready for Flutter integration.

## Common Failure Patterns
- Using `var` everywhere and losing type clarity.
- Confusing `final` with `const`.
- Writing long functions instead of extracting small typed helpers.
- Treating nullable values as if they are always present.
- Forgetting that async code changes execution order and error flow.
- Overusing inheritance when composition or a mixin is simpler.

## Practice Rules
- Type every example manually at least once before modifying it.
- Run small experiments to confirm language behavior instead of assuming.
- Keep one notebook or Markdown file with mistakes you repeatedly make.
- After each module, rewrite one solution from memory without notes.

## Suggested Projects

### Mini Project 1: Personal Expense Tracker
- Parse transactions from hardcoded sample data or a local file.
- Group by category and compute totals.
- Add validation for invalid amounts and missing fields.

### Mini Project 2: Library or Inventory Manager
- Model items, categories, and user actions with classes.
- Add filtering, search, and simple persistence simulation.
- Use interfaces to swap storage strategies.

### Capstone Idea: Habit and Goal Engine
- Represent habits, schedules, completion history, and summaries.
- Add async persistence boundaries and typed repositories.
- Expose the core logic in pure Dart so the same code can later back a Flutter UI.

## Weekly Plan
- Week 1: Phase 1 modules and console exercises
- Week 2: Phase 2 modules and OOP refactor
- Week 3: Phase 3 modules and async/null-safety drills
- Week 4: Capstone implementation, cleanup, and explanation practice

## How This Connects To Flutter
- Flutter widgets are easier when Dart syntax is automatic.
- App state is easier to manage when you already understand classes and immutability.
- Networking and storage code depend on `Future`, null safety, and typed models.
- Clean Flutter architecture starts with clean Dart boundaries.

## Exit Criteria
- You can explain `final`, `const`, nullable types, `Future`, and `Stream` clearly.
- You can design a small model/service/repository flow in pure Dart.
- You can read Flutter examples and understand the Dart portion immediately.
- You can start the Flutter track without feeling blocked by the language.
