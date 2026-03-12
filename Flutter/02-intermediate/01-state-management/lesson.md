# Flutter State Management Foundations

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Navigation and widget basics

## Learning Outcomes
- Distinguish local UI state from app-level state.
- Choose a simple state pattern before reaching for complex tooling.
- Keep state updates predictable and debuggable.

## Deep Dive
### What State Really Is
- State is the data that changes what the UI should render.

### Lifting and Scoping State
- Put state where the smallest useful set of widgets can access it.

### Simplicity First
- Start with `setState`, inherited patterns, or a lightweight approach before introducing heavy abstractions.

## Worked Example
```dart
setState(() {
  isLoading = true;
});
```

## Common Pitfalls
- Globalizing state too early.
- Mixing async service calls directly into large widget builds.
- Updating state from too many locations.

## Debugging Checklist
- Identify the source of truth.
- Trace who owns writes to the state.
- Check rebuild scope when UI updates feel excessive.

## Step-by-Step Practice Plan
1. Manage local toggle state.
2. Share state across two widgets.
3. Separate state updates from rendering details.

## Mini Project Task
Build a filterable task list with clear loading and empty states.

## Interview Q&A
- Q: What is the first state-management question to ask?
- A: Who owns this data and which widgets truly need it?

## Exit Criteria
- You can place state intentionally instead of reacting after the UI gets messy.
