# Flutter Project Structure and Code Organization

## Module Info
- Level: Beginner
- Duration: 75 minutes
- Prerequisites: Flutter setup

## Learning Outcomes
- Understand the role of `lib/`, `pubspec.yaml`, assets, and platform folders.
- Organize features without creating a tangled widget tree.
- Separate UI, models, and services in a maintainable way.

## Deep Dive
### What Lives Where
- `lib/` should hold app code.
- `pubspec.yaml` manages dependencies and assets.

### Feature-Oriented Structure
- Group code by feature or responsibility instead of dumping everything into `main.dart`.

### Scaling Safely
- Structure decisions should reduce future confusion, not satisfy abstract architecture ideals too early.

## Worked Example
```text
lib/
  app/
  features/tasks/
  services/
  models/
  main.dart
```

## Common Pitfalls
- Keeping the whole app in one file.
- Mixing networking, widgets, and state in the same class.
- Creating too many folders before the app has real complexity.

## Debugging Checklist
- Check whether file placement helps or hides ownership.
- Keep imports local and understandable.
- Refactor structure when a folder becomes a dumping ground.

## Step-by-Step Practice Plan
1. Review the generated app structure.
2. Split a sample feature into folders.
3. Move shared logic out of UI files.

## Mini Project Task
Reorganize a small app into feature and shared layers.

## Interview Q&A
- Q: Why is structure important so early?
- A: Because poor structure increases friction every time the app grows or changes.

## Exit Criteria
- You can explain where new code should live before you write it.
