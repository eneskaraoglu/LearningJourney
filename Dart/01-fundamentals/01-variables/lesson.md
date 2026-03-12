# Variables and Immutability in Dart

## Module Info
- Level: Beginner
- Duration: 60 minutes
- Prerequisites: None

## Learning Outcomes
- Choose between `var`, explicit types, `final`, and `const`.
- Explain compile-time constants versus runtime immutability.
- Avoid accidental reassignment and unclear variable intent.

## Deep Dive
### Declaration Choices
- Use explicit types when clarity matters.
- Use `var` when the right-hand side already makes the type obvious.

### `final` vs `const`
- `final` means assigned once at runtime.
- `const` means known at compile time and deeply immutable for constant expressions.

### Naming for Maintenance
- Prefer descriptive names that reflect domain meaning instead of temporary abbreviations.

## Worked Example
```dart
const taxRate = 0.18;
final createdAt = DateTime.now();
String productName = 'Keyboard';
var stockCount = 12;
```

## Common Pitfalls
- Using `var` everywhere and losing readability.
- Expecting `final` values to be compile-time constants.
- Reusing a variable for multiple meanings in one function.

## Debugging Checklist
- Check inferred types in your IDE.
- Confirm whether a value must be constant or only immutable after assignment.
- Rename unclear variables before adding more logic.

## Step-by-Step Practice Plan
1. Rewrite a short script using explicit types.
2. Replace mutable values with `final` where possible.
3. Identify which values can safely become `const`.

## Mini Project Task
Define configuration and runtime variables for a small order summary program.

## Interview Q&A
- Q: When do you prefer explicit typing over `var`?
- A: When it improves readability or prevents ambiguity in domain-heavy code.

## Exit Criteria
- You can justify each variable declaration style you use.
