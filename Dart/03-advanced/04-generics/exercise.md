# Exercise - Generics and Reusable Type-Safe APIs in Dart

## Part A - Core Implementation
Build a generic wrapper such as `Result<T>`, `Repository<T>`, or `Page<T>` and use it with at least two concrete model types.

## Part B - Validation and Error Cases
Ensure success and failure states remain type-safe and that callers cannot misuse the abstraction easily.

## Part C - Reliability and Refactor
Refactor any duplicated type-specific helper into a generic alternative, then verify the code is still readable.

## Constraints
- Prefer meaningful generic abstractions over generic code for its own sake.
- Avoid `dynamic` in the core abstraction.
- Keep success and error contracts explicit.

## Acceptance Criteria
- The abstraction works with multiple concrete types.
- Type safety is preserved at call sites.
- The design remains understandable to another developer.

## Bonus Challenge
Add a generic mapper or transformer method that converts one wrapped type to another.

## Reflection Prompts
- Did generics reduce duplication or just add indirection?
- Where is the abstraction boundary genuinely useful?
