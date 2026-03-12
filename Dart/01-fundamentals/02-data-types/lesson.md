# Data Types and Type Safety in Dart

## Module Info
- Level: Beginner
- Duration: 75 minutes
- Prerequisites: Variables and immutability

## Learning Outcomes
- Use Dart core types correctly.
- Distinguish numeric, text, boolean, and object values.
- Prevent simple type mismatches before runtime.

## Deep Dive
### Core Types
- `int` for whole numbers.
- `double` for decimal values.
- `String` for text.
- `bool` for true or false state.

### Type-Safe Operations
- Keep numeric calculations numeric until final formatting.
- Avoid mixing display strings with business values.

### Conversion Boundaries
- Parse user input at the edges of the program, then work with typed data internally.

## Worked Example
```dart
int quantity = 3;
double price = 19.99;
String currency = 'USD';
bool inStock = true;

double total = quantity * price;
```

## Common Pitfalls
- Storing numbers as strings too early.
- Comparing text values when a boolean flag is cleaner.
- Forgetting parse failures when converting input.

## Debugging Checklist
- Print runtime values and types when output looks wrong.
- Inspect conversion code first when calculations fail.
- Keep formatting separate from computation.

## Step-by-Step Practice Plan
1. Model a product with typed fields.
2. Parse a numeric string into a number.
3. Format final output only at the presentation step.

## Mini Project Task
Build a typed invoice calculator from hardcoded input values.

## Interview Q&A
- Q: Why keep formatted text separate from numeric data?
- A: Because arithmetic and validation remain safer and easier to test.

## Exit Criteria
- You can model a small domain with the right primitive types.
