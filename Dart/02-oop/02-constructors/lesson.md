# Constructors and Object Creation Patterns in Dart

## Module Info
- Level: Intermediate
- Duration: 75 minutes
- Prerequisites: Classes

## Learning Outcomes
- Use default, named, factory, and redirecting constructors.
- Apply constructors to enforce valid object setup.
- Keep creation logic readable.

## Deep Dive
### Default and Named Constructors
- Named constructors help express different creation paths.

### Factory Constructors
- Use factories when creation may return cached, validated, or alternative instances.

### Initialization Discipline
- Constructor design is often the first guard against invalid state.

## Worked Example
```dart
class UserProfile {
  final String name;
  final bool isGuest;

  UserProfile(this.name) : isGuest = false;

  UserProfile.guest()
      : name = 'Guest',
        isGuest = true;
}
```

## Common Pitfalls
- Cramming too much branching into one constructor.
- Allowing invalid values and hoping later code fixes them.
- Using factories where a normal constructor is enough.

## Debugging Checklist
- Trace every object creation path.
- Check initializer lists and default values.
- Confirm constructor names communicate intent.

## Step-by-Step Practice Plan
1. Add a named constructor for a special case.
2. Enforce one validation rule at creation time.
3. Refactor unclear construction paths.

## Mini Project Task
Add multiple creation modes to an account or profile model.

## Interview Q&A
- Q: Why use a named constructor?
- A: It makes object creation intent explicit without overloaded parameter ambiguity.

## Exit Criteria
- You can choose a constructor style based on object creation needs.
