# Exercise - Classes and Object Modeling in Dart

## Part A - Core Implementation
Design classes for a small domain such as tasks, books, habits, or products, including fields and at least one behavior method per main class.

## Part B - Validation and Error Cases
Prevent invalid object state such as empty titles, negative values, or unsupported statuses.

## Part C - Reliability and Refactor
Refactor map-heavy code to use objects and move domain rules into methods where appropriate.

## Constraints
- Each class must represent a real domain concept.
- Validation should happen near object creation.
- Avoid dumping all logic into a single service class.

## Acceptance Criteria
- The data model is typed and intention-revealing.
- Invalid state is blocked or clearly surfaced.
- Objects own the behavior that belongs to them.

## Bonus Challenge
Add a `toString()` or summary method that helps with debugging.

## Reflection Prompts
- Which concept was initially modeled too generically?
- What logic became clearer once it moved into a class?
