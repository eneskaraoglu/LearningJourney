# Exercise - Inheritance and Reuse Tradeoffs in Dart

## Part A - Core Implementation
Create a small class hierarchy such as payment methods, notifications, or employees, with shared base behavior and child-specific data.

## Part B - Validation and Error Cases
Test whether child classes still satisfy the expectations of the parent contract.

## Part C - Reliability and Refactor
Replace at least one poor inheritance use case with composition and explain why it is better.

## Constraints
- Use inheritance only for a genuine "is-a" relationship.
- Keep the hierarchy shallow.
- Avoid duplicated logic between sibling classes.

## Acceptance Criteria
- Shared behavior lives in the base where it truly belongs.
- Child classes remain predictable.
- At least one design tradeoff is documented.

## Bonus Challenge
Introduce a shared helper service to demonstrate composition beside inheritance.

## Reflection Prompts
- Which part of the hierarchy felt forced?
- Where did composition reduce coupling?
