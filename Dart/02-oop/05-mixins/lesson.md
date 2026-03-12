# Mixins and Behavior Reuse in Dart

## Module Info
- Level: Intermediate
- Duration: 60 minutes
- Prerequisites: Interfaces and inheritance

## Learning Outcomes
- Use mixins for reusable behavior without forcing inheritance.
- Recognize when a mixin is appropriate versus a helper class.
- Keep behavior reuse explicit and safe.

## Deep Dive
### What Mixins Solve
- Mixins let multiple classes share behavior that does not define their main identity.

### Good Use Cases
- Logging helpers, validation helpers, timestamp formatting, or lifecycle utilities.

### Boundaries
- A mixin should stay focused and avoid hidden dependencies.

## Worked Example
```dart
mixin TimestampLogger {
  void log(String message) {
    print('[${DateTime.now().toIso8601String()}] $message');
  }
}
```

## Common Pitfalls
- Using mixins for large unrelated feature bundles.
- Hiding stateful dependencies inside a mixin.
- Replacing sound object design with behavior stacking.

## Debugging Checklist
- Check what the mixin expects from the target class.
- Keep the mixed-in behavior small and traceable.
- Refactor to composition if the mixin becomes too clever.

## Step-by-Step Practice Plan
1. Add a tiny reusable behavior with a mixin.
2. Apply it to two unrelated classes.
3. Compare the same design using a helper service.

## Mini Project Task
Share logging or validation behavior across repository and sync classes.

## Interview Q&A
- Q: When is a mixin better than inheritance?
- A: When you want to share behavior without claiming an "is-a" relationship.

## Exit Criteria
- You can use a mixin without turning it into a hidden mini-framework.
