# Null Safety and Defensive Modeling in Dart

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: OOP basics

## Learning Outcomes
- Use nullable and non-nullable types intentionally.
- Apply `?`, `!`, and null-aware operators safely.
- Design APIs that reduce null-related bugs.

## Deep Dive
### Non-Nullable by Default
- Dart pushes you to model absence explicitly instead of hoping values exist.

### Null-Aware Tools
- Use `?.`, `??`, and `??=` to handle optional values safely.
- Use `!` only when you can prove the value is present.

### Domain Design
- Nullable fields often indicate optional data, deferred loading, or incomplete user input.

## Worked Example
```dart
String displayName(String? nickname, String fullName) {
  return nickname?.trim().isNotEmpty == true ? nickname!.trim() : fullName;
}
```

## Common Pitfalls
- Sprinkling `!` everywhere to silence the compiler.
- Marking too many fields nullable without business justification.
- Forgetting null at parsing and API boundaries.

## Debugging Checklist
- Trace where null first enters the flow.
- Replace forced unwraps with explicit guards where possible.
- Revisit model design if everything becomes nullable.

## Step-by-Step Practice Plan
1. Convert one model to non-nullable by default.
2. Handle optional fields with null-aware operators.
3. Remove unsafe forced unwraps.

## Mini Project Task
Refactor a profile or settings model to represent optional values explicitly.

## Interview Q&A
- Q: Why is non-nullable by default valuable?
- A: It moves a large class of bugs from runtime surprise to compile-time design decisions.

## Exit Criteria
- You can explain the difference between optional data and poorly modeled data.
