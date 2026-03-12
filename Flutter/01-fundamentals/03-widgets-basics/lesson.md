# Flutter Widgets Basics

## Module Info
- Level: Beginner
- Duration: 90 minutes
- Prerequisites: Project structure

## Learning Outcomes
- Understand widgets as the building blocks of Flutter UI.
- Distinguish stateless and stateful responsibilities.
- Compose small reusable widgets instead of giant screens.

## Deep Dive
### Widget Tree Thinking
- Every screen is a composition of smaller widgets with explicit configuration.

### Stateless vs Stateful
- Stateless widgets render from input.
- Stateful widgets manage local mutable UI state.

### Reusability
- Extract repeated UI into focused widgets before duplication spreads.

## Worked Example
```dart
class GreetingCard extends StatelessWidget {
  final String name;

  const GreetingCard({super.key, required this.name});

  @override
  Widget build(BuildContext context) {
    return Text('Hello, $name');
  }
}
```

## Common Pitfalls
- Building oversized widget classes.
- Storing state too high or too low in the tree.
- Extracting widgets with unclear names.

## Debugging Checklist
- Inspect the widget tree in DevTools.
- Check whether a widget is stateful for the right reason.
- Rename extracted widgets based on UI meaning, not visual trivia.

## Step-by-Step Practice Plan
1. Build a simple screen with core widgets.
2. Extract one repeated element.
3. Convert local interaction state into a stateful widget.

## Mini Project Task
Create a dashboard screen with reusable cards and action rows.

## Interview Q&A
- Q: Why is widget composition so important in Flutter?
- A: It keeps UI readable, reusable, and easier to debug as screens grow.

## Exit Criteria
- You can build small widgets that compose into a clear screen structure.
