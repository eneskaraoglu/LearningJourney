# Flutter Layouts and Constraint Thinking

## Module Info
- Level: Beginner
- Duration: 90 minutes
- Prerequisites: Widget basics

## Learning Outcomes
- Build layouts with Row, Column, Stack, Expanded, Flexible, and scroll views.
- Understand Flutter's constraint-based layout behavior.
- Diagnose overflow and sizing issues systematically.

## Deep Dive
### Constraints Matter
- Flutter layout bugs usually come from misunderstanding incoming constraints.

### Common Layout Tools
- `Row` and `Column` for linear layout.
- `Expanded` and `Flexible` for available space management.
- `ListView` for scrolling collections.

### Responsive Thinking
- Design for varying widths, heights, and text sizes instead of one ideal screen.

## Worked Example
```dart
Row(
  children: const [
    Expanded(child: Text('Title')),
    SizedBox(width: 12),
    Icon(Icons.chevron_right),
  ],
)
```

## Common Pitfalls
- Nesting scrollables without a plan.
- Ignoring overflow warnings.
- Using fixed sizes where flexible layout is needed.

## Debugging Checklist
- Read overflow messages carefully.
- Inspect parent constraints before changing child widgets.
- Test on small-screen layouts early.

## Step-by-Step Practice Plan
1. Build a profile or settings screen layout.
2. Trigger an overflow intentionally and fix it.
3. Make the screen scroll safely on smaller devices.

## Mini Project Task
Create a responsive task list and detail layout.

## Interview Q&A
- Q: Why do Flutter layout bugs often feel confusing?
- A: Because the visible issue is usually downstream from how constraints were passed earlier in the tree.

## Exit Criteria
- You can debug common layout failures without trial-and-error guessing.
