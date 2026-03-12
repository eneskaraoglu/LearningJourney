# Async and Await in Dart

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Null safety and functions

## Learning Outcomes
- Understand `Future`-based workflows.
- Use `async` and `await` without losing error clarity.
- Handle timeouts, sequencing, and failure paths deliberately.

## Deep Dive
### `Future` as Deferred Work
- A `Future` represents a value or error that will complete later.

### Sequential vs Concurrent Thinking
- Awaiting everything immediately can simplify logic but may slow workflows unnecessarily.

### Error Handling
- Async failures should be caught near meaningful recovery boundaries.

## Worked Example
```dart
Future<String> fetchGreeting() async {
  await Future.delayed(const Duration(milliseconds: 300));
  return 'Hello';
}
```

## Common Pitfalls
- Forgetting to await a `Future`.
- Mixing synchronous and asynchronous errors carelessly.
- Hiding slow operations inside UI-sensitive or time-sensitive code paths.

## Debugging Checklist
- Check which calls return `Future`.
- Add timing logs around slow async steps.
- Test timeout and failure scenarios, not just the happy path.

## Step-by-Step Practice Plan
1. Simulate an async request with a delay.
2. Catch and log a thrown async error.
3. Add a timeout or fallback strategy.

## Mini Project Task
Simulate loading and saving task data with retry-aware async helpers.

## Interview Q&A
- Q: Why does async code often feel harder to debug?
- A: Because control flow and error timing are no longer strictly linear.

## Exit Criteria
- You can reason about when a value is available and how failures propagate.
