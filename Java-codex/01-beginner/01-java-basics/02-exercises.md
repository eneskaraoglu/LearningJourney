# Exercises - Java Basics

## Part A - Core Implementation
1. Build the minimum working implementation for `Java Basics` using clean class/module boundaries.
2. Add input validation for required fields and basic type/format constraints.
3. Add logging at key transition points so behavior is inspectable.

## Part B - Error Paths and Robustness
1. Handle at least three invalid scenarios with explicit error messages/codes.
2. Add timeout or fallback behavior where a dependency may fail.
3. Ensure failures do not leak sensitive internals in responses/logs.

## Part C - Refactor and Quality
1. Separate transport, service, and persistence responsibilities where applicable.
2. Add at least one unit test and one integration test.
3. Refactor for readability without changing behavior.

## Constraints
- Keep methods small and focused.
- Use explicit naming for domain concepts.
- Prefer deterministic behavior over hidden side effects.

## Acceptance Criteria
- Happy path works end to end.
- Invalid input returns stable error format.
- Tests run and validate both success and failure scenarios.
- Code is readable enough for another learner to extend.

## Bonus Challenge
- Add simple performance instrumentation for one critical path.
- Add one observability hook (metric counter or structured log field).

## Reflection Prompts
1. Which decision improved maintainability the most?
2. Which bug was hardest to isolate and why?
3. What would you change before deploying this to production?
