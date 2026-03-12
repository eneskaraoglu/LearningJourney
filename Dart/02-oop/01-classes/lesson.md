# Classes and Object Modeling in Dart

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Collections and functions

## Learning Outcomes
- Define classes with fields and methods.
- Model domain concepts with clear responsibilities.
- Know when a class is better than a raw map.

## Deep Dive
### Why Classes Matter
- Classes protect structure and meaning in growing codebases.

### State and Behavior
- Keep related data and operations together.

### Domain Modeling
- A good class name reflects a real concept in the app, such as `Task`, `Invoice`, or `UserProfile`.

## Worked Example
```dart
class Task {
  final String title;
  bool completed;

  Task(this.title, {this.completed = false});

  void markDone() {
    completed = true;
  }
}
```

## Common Pitfalls
- Creating classes that are just bags of unrelated fields.
- Keeping all business logic outside the model.
- Using maps where the shape is stable and important.

## Debugging Checklist
- Check object creation paths first.
- Verify field defaults and method side effects.
- Confirm the class truly owns the behavior you placed in it.

## Step-by-Step Practice Plan
1. Convert a map-based record to a class.
2. Add one behavior method.
3. Use objects inside a collection.

## Mini Project Task
Model a simple habit tracker with classes for habit, entry, and summary.

## Interview Q&A
- Q: What does a class buy you over a map?
- A: Stronger structure, clearer intent, and safer behavior boundaries.

## Exit Criteria
- You can identify when a concept deserves its own class.
