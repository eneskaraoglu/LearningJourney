# Flutter Navigation and Screen Flow

## Module Info
- Level: Beginner
- Duration: 75 minutes
- Prerequisites: Layout basics

## Learning Outcomes
- Navigate between screens cleanly.
- Pass arguments and return results safely.
- Keep app flow predictable as screens increase.

## Deep Dive
### Route Flow
- Navigation is part of product behavior, not just UI plumbing.

### Passing Data
- Keep route arguments explicit so screen dependencies stay visible.

### Back Navigation
- Plan how users return, cancel, or complete an action instead of relying on defaults blindly.

## Worked Example
```dart
Navigator.of(context).push(
  MaterialPageRoute(
    builder: (_) => const DetailsScreen(),
  ),
);
```

## Common Pitfalls
- Hardcoding navigation logic in too many widgets.
- Passing loosely structured data between screens.
- Forgetting result handling on pop flows.

## Debugging Checklist
- Trace which widget initiates navigation.
- Check route arguments and null handling.
- Test forward, back, cancel, and save flows.

## Step-by-Step Practice Plan
1. Add a second screen.
2. Pass one argument into it.
3. Return a result when leaving the screen.

## Mini Project Task
Build a list-detail-create flow for a task or notes app.

## Interview Q&A
- Q: Why is navigation design a maintainability concern?
- A: Because unclear route flow creates fragile feature coupling and confusing user journeys.

## Exit Criteria
- You can implement and explain a simple multi-screen flow with data passing.
