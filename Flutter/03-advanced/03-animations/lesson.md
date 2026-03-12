# Flutter Animations and Motion Design

## Module Info
- Level: Advanced
- Duration: 75 minutes
- Prerequisites: Layouts and performance basics

## Learning Outcomes
- Use animation to improve clarity and polish.
- Choose between simple implicit animations and more controlled approaches.
- Avoid motion that harms usability or performance.

## Deep Dive
### Purposeful Motion
- Animation should explain change, not distract from it.

### Implicit vs Explicit
- Implicit animation widgets are great for small transitions.
- More custom flows need controllers and tighter coordination.

### Performance and UX
- Motion should remain smooth and should not block interaction unnecessarily.

## Worked Example
```dart
AnimatedOpacity(
  duration: const Duration(milliseconds: 250),
  opacity: isVisible ? 1 : 0,
  child: child,
)
```

## Common Pitfalls
- Adding motion everywhere.
- Animating layout-heavy trees without need.
- Ignoring accessibility or reduced-motion concerns.

## Debugging Checklist
- Verify the motion communicates state change clearly.
- Check frame smoothness on device.
- Remove animation that adds noise rather than understanding.

## Step-by-Step Practice Plan
1. Add one meaningful entrance or state-change animation.
2. Compare implicit and controller-based approaches.
3. Evaluate whether the motion improves comprehension.

## Mini Project Task
Animate a task card insertion, validation message, or page transition.

## Interview Q&A
- Q: What makes an animation "good" in product terms?
- A: It makes state changes easier to follow without slowing the user down.

## Exit Criteria
- You can add motion that supports UX instead of decorating randomly.
