# Flutter Performance and Rebuild Discipline

## Module Info
- Level: Advanced
- Duration: 90 minutes
- Prerequisites: Intermediate Flutter modules

## Learning Outcomes
- Recognize common Flutter performance problems.
- Reduce unnecessary rebuilds and layout work.
- Use tooling to investigate slow UI rather than guessing.

## Deep Dive
### Rebuild Awareness
- Not every rebuild is bad, but unnecessary wide rebuilds add cost quickly.

### Expensive Patterns
- Oversized widget trees, repeated heavy calculations, and careless list rendering cause jank.

### Measure First
- Use DevTools, frame timing, and real-device testing before micro-optimizing.

## Worked Example
```dart
// Extract static subtrees and expensive work out of hot rebuild paths.
```

## Common Pitfalls
- Optimizing blindly.
- Putting heavy work directly in `build()`.
- Ignoring list virtualization and image sizing.

## Debugging Checklist
- Check which widgets rebuild and why.
- Profile on a real or low-end device.
- Inspect image and list rendering behavior.

## Step-by-Step Practice Plan
1. Identify a rebuild-heavy screen.
2. Extract stable widgets and move heavy work out of build.
3. Re-measure after changes.

## Mini Project Task
Optimize a scrolling list and a filterable dashboard screen.

## Interview Q&A
- Q: Why is profiling more important than intuition for performance work?
- A: Because the most obvious suspect is often not the real bottleneck.

## Exit Criteria
- You can investigate and improve a slow screen with evidence.
