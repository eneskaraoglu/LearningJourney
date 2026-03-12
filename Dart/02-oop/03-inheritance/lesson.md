# Inheritance and Reuse Tradeoffs in Dart

## Module Info
- Level: Intermediate
- Duration: 75 minutes
- Prerequisites: Constructors

## Learning Outcomes
- Use inheritance when there is a real "is-a" relationship.
- Share behavior carefully without creating rigid hierarchies.
- Recognize when composition is the safer option.

## Deep Dive
### Good Inheritance
- Parent and child types should be substitutable without surprise.

### Bad Inheritance
- Do not inherit only to reuse a few lines of code.

### Composition Alternative
- Prefer composing helpers or collaborating objects when behavior is optional or cross-cutting.

## Worked Example
```dart
class Notification {
  final String message;
  Notification(this.message);
}

class EmailNotification extends Notification {
  final String email;
  EmailNotification(String message, this.email) : super(message);
}
```

## Common Pitfalls
- Deep inheritance trees for simple apps.
- Child classes that violate parent expectations.
- Reuse by inheritance when a helper object would be clearer.

## Debugging Checklist
- Check whether child objects can safely replace parent references.
- Review overridden methods for broken assumptions.
- Simplify hierarchies if conditionals keep leaking into parent classes.

## Step-by-Step Practice Plan
1. Model a small parent-child example.
2. Identify one case where composition is better.
3. Refactor inheritance that exists only for code reuse.

## Mini Project Task
Model message delivery types with a shared base and channel-specific fields.

## Interview Q&A
- Q: When should you avoid inheritance?
- A: When the relationship is not truly hierarchical or the child breaks parent behavior expectations.

## Exit Criteria
- You can explain why a hierarchy exists instead of saying it "just reuses code."
