# Flutter Networking and API Integration

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Async Dart and forms basics

## Learning Outcomes
- Fetch remote data and reflect loading, success, and error states in the UI.
- Parse API payloads into typed models.
- Keep networking outside widget rendering logic where possible.

## Deep Dive
### Network Boundaries
- Widgets should not become low-level HTTP clients.

### Typed Parsing
- Convert raw JSON into models early so the rest of the app works with typed objects.

### Failure as a First-Class Case
- Design retry and error messaging before assuming the happy path.

## Worked Example
```dart
Future<List<Task>> fetchTasks() async {
  // request, decode, and map to typed models
  return [];
}
```

## Common Pitfalls
- Parsing JSON inline inside `build()`.
- Forgetting loading and retry states.
- Treating every backend failure as the same generic error.

## Debugging Checklist
- Log response shape when parsing fails.
- Check status code handling.
- Confirm stale loading state is cleared after failure.

## Step-by-Step Practice Plan
1. Fetch a list from an API.
2. Parse it into typed models.
3. Add empty, error, and retry UI.

## Mini Project Task
Build a remote-backed task or recipe browser screen.

## Interview Q&A
- Q: Why keep networking out of widgets?
- A: It reduces rebuild-side complexity and makes data flow easier to test and reuse.

## Exit Criteria
- You can integrate remote data without turning UI code into a transport layer.
