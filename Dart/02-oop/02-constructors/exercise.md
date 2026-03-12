# Exercise - Constructors and Object Creation Patterns in Dart

## Part A - Core Implementation
Create a model that supports at least two object creation paths, such as registered user vs guest, or persisted record vs draft.

## Part B - Validation and Error Cases
Reject empty or invalid input during construction and surface clear error messages or safe alternatives.

## Part C - Reliability and Refactor
Refactor ambiguous constructors into named or factory constructors with clearer intent.

## Constraints
- Constructor names must explain the creation scenario.
- Keep object state valid immediately after construction.
- Avoid constructor parameter lists that are hard to read at call sites.

## Acceptance Criteria
- Multiple creation paths are supported cleanly.
- Invalid input is blocked near the constructor boundary.
- Calling code is readable.

## Bonus Challenge
Add a factory constructor for parsing from a map or simple JSON-like structure.

## Reflection Prompts
- Which constructor design made the call site easiest to understand?
- What invalid state did you prevent early?
