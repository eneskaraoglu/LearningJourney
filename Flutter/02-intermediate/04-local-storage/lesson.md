# Flutter Local Storage and Persistence

## Module Info
- Level: Intermediate
- Duration: 75 minutes
- Prerequisites: State management and networking

## Learning Outcomes
- Persist lightweight local data safely.
- Distinguish cache, settings, and user-generated local content.
- Keep storage access behind a clear boundary.

## Deep Dive
### Why Persistence Matters
- Users expect settings, drafts, and preferences to survive app restarts.

### Storage Types
- Use simple key-value storage for lightweight settings.
- Reserve heavier local databases for richer offline features.

### Boundary Design
- A storage service should hide serialization details from widgets.

## Worked Example
```dart
Future<void> saveThemeMode(String mode) async {
  // persist the selected mode in local storage
}
```

## Common Pitfalls
- Mixing persistence code into widgets.
- Storing inconsistent keys and formats.
- Forgetting startup hydration flow.

## Debugging Checklist
- Verify read and write keys match.
- Test app restart behavior.
- Confirm defaults when no stored value exists.

## Step-by-Step Practice Plan
1. Save a small preference.
2. Load it at startup.
3. Apply the restored value in the UI.

## Mini Project Task
Persist filters, favorites, or theme settings in a small app.

## Interview Q&A
- Q: Why treat storage as a boundary instead of a quick utility?
- A: Because serialization and lifecycle bugs spread quickly when every screen writes data directly.

## Exit Criteria
- You can persist and restore simple app state reliably.
