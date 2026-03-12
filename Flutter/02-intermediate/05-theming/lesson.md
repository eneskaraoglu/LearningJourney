# Flutter Theming and UI Consistency

## Module Info
- Level: Intermediate
- Duration: 75 minutes
- Prerequisites: Layouts and local storage

## Learning Outcomes
- Build a coherent theme instead of scattering colors and text styles.
- Use theme tokens consistently across the app.
- Support maintainable visual changes over time.

## Deep Dive
### Theme as a System
- A theme is a contract for spacing, typography, color, and component style choices.

### Avoid Hardcoding
- Repeated direct color values create drift and make redesigns expensive.

### Product Consistency
- Consistent theming improves perceived quality and implementation speed.

## Worked Example
```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
)
```

## Common Pitfalls
- Hardcoding styles in every widget.
- Mixing multiple visual directions.
- Forgetting to theme input, error, and empty states consistently.

## Debugging Checklist
- Search for repeated literal colors and text styles.
- Verify theme usage across major screens.
- Test contrast and readability on real devices.

## Step-by-Step Practice Plan
1. Define a base color scheme and text theme.
2. Apply shared button and input styling.
3. Persist a theme preference if relevant.

## Mini Project Task
Create a themed productivity app with reusable style tokens.

## Interview Q&A
- Q: Why should theming matter before launch polish?
- A: Because visual inconsistency is a structural problem, not just a final design pass issue.

## Exit Criteria
- You can make app-wide style changes from a centralized theme layer.
