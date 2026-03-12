# Streams and Event-Driven Data in Dart

## Module Info
- Level: Advanced
- Duration: 90 minutes
- Prerequisites: Async and await

## Learning Outcomes
- Understand how streams model ongoing events.
- Listen to, transform, and manage event sequences.
- Choose between one-time `Future` results and multi-event streams.

## Deep Dive
### Stream Mental Model
- Streams represent values arriving over time, not one final result.

### Use Cases
- User input events, socket messages, sensor updates, and polling pipelines.

### Stream Hygiene
- Manage subscriptions carefully to avoid leaks or duplicated listeners.

## Worked Example
```dart
Stream<int> countStream() async* {
  for (var i = 1; i <= 3; i++) {
    await Future.delayed(const Duration(milliseconds: 200));
    yield i;
  }
}
```

## Common Pitfalls
- Using a stream when a single future is enough.
- Forgetting to cancel subscriptions.
- Hiding complex side effects inside listeners.

## Debugging Checklist
- Confirm how many events should arrive.
- Trace listener lifecycle and cancellation.
- Separate event transformation from side effects.

## Step-by-Step Practice Plan
1. Create a small stream with delayed values.
2. Listen and log each event.
3. Add filtering or mapping logic.

## Mini Project Task
Simulate a progress or notification stream for a background sync feature.

## Interview Q&A
- Q: When is a stream better than a future?
- A: When multiple values or updates arrive over time instead of a single completion.

## Exit Criteria
- You can model and consume an event stream without leaking control.
