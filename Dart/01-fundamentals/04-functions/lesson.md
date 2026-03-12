# Functions and Reusable Logic in Dart

## Module Info
- Level: Beginner
- Duration: 90 minutes
- Prerequisites: Control flow

## Learning Outcomes
- Write functions with clear inputs and outputs.
- Use positional, named, and optional parameters appropriately.
- Break long scripts into reusable units.

## Deep Dive
### Function Boundaries
- A function should have one clear responsibility.
- Small, typed functions are easier to test and reuse.

### Named Parameters
- Named parameters improve readability for configuration-heavy calls.

### Return Values
- Prefer returning values instead of mutating outer state when possible.

## Worked Example
```dart
double calculateTotal({
  required double unitPrice,
  required int quantity,
  double discount = 0,
}) {
  return (unitPrice * quantity) - discount;
}
```

## Common Pitfalls
- Passing too many loosely related arguments.
- Hiding side effects inside helper functions.
- Returning inconsistent types for success and failure paths.

## Debugging Checklist
- Check parameter names and defaults.
- Verify the function contract for invalid input.
- Test one function in isolation before combining flows.

## Step-by-Step Practice Plan
1. Extract repeated logic into a helper.
2. Convert config-like arguments to named parameters.
3. Add a validation wrapper function.

## Mini Project Task
Turn a single-file budget calculator into small, reusable functions.

## Interview Q&A
- Q: When do named parameters matter most?
- A: When the call site should read like a clear configuration statement.

## Exit Criteria
- You can design functions that are easy to read at both definition and call sites.
