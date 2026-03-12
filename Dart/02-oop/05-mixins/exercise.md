# Exercise - Mixins and Behavior Reuse in Dart

## Part A - Core Implementation
Create one focused mixin such as logging, validation, or state-summary behavior and apply it to at least two classes.

## Part B - Validation and Error Cases
Document or enforce any assumptions the mixin makes about the host class.

## Part C - Reliability and Refactor
Compare the mixin solution with a helper-class solution and refactor if the mixin becomes too broad.

## Constraints
- Keep the mixin focused on one behavior theme.
- Do not hide major state transitions inside the mixin.
- Make dependencies visible and understandable.

## Acceptance Criteria
- The mixin reduces duplication.
- Behavior remains readable in host classes.
- The design does not misuse inheritance semantics.

## Bonus Challenge
Add a second mixin only if the two behaviors remain clearly separate.

## Reflection Prompts
- Did the mixin improve clarity or only reduce lines of code?
- When would you choose composition instead?
