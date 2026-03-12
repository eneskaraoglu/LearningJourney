# Control Flow and Decision Making in Dart

## Module Info
- Level: Beginner
- Duration: 75 minutes
- Prerequisites: Variables and data types

## Learning Outcomes
- Use `if`, `else`, `switch`, loops, and guards effectively.
- Keep branching readable as rules grow.
- Avoid deeply nested logic.

## Deep Dive
### Conditional Logic
- Use guard clauses for invalid states early.
- Reserve nested blocks for truly dependent decisions.

### Loops
- Choose `for`, `for-in`, and `while` based on the data shape and stop condition.

### Business Rule Clarity
- Branches should reflect real domain rules, not incidental implementation detail.

## Worked Example
```dart
String shippingLabel(int total) {
  if (total <= 0) return 'invalid';
  if (total >= 100) return 'free';
  return 'paid';
}
```

## Common Pitfalls
- Nesting too many conditions.
- Hiding invalid-state checks deep in the function.
- Using loops when simpler logic would be clearer.

## Debugging Checklist
- Trace which branch is actually executed.
- Test edge cases around thresholds.
- Rename condition flags if the branch meaning is unclear.

## Step-by-Step Practice Plan
1. Write a simple grading or discount rule.
2. Refactor nested conditions into guard clauses.
3. Add loop-based summarization over a list.

## Mini Project Task
Process a list of orders and assign each one a status label.

## Interview Q&A
- Q: Why are guard clauses useful?
- A: They reduce nesting and surface invalid paths immediately.

## Exit Criteria
- You can structure branching logic so another developer can read it quickly.
