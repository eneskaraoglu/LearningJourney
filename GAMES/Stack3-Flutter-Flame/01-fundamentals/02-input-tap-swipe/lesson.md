# Input Handling: Tap and Swipe (Flutter + Flame)

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Game loop lesson complete, Flame input mixins basics

## Learning Outcomes
- Handle taps and swipe gestures with Flame components.
- Route gesture intents into game commands.
- Keep input logic testable and decoupled from rendering.

## Deep Dive
### Input Pipeline
Use Flame tap/drag callbacks or Flutter gesture overlays based on complexity.

### Gesture Intent Layer
Convert raw coordinates into command intents: jump, dash, drop.

### UI Interactions
Guard against gameplay taps when overlays are active.

## Worked Example
```dart
class PlayerComponent extends PositionComponent with TapCallbacks {
  void onJumpRequested() {
    // Trigger jump in movement controller.
  }

  @override
  void onTapDown(TapDownEvent event) {
    onJumpRequested();
  }
}
```

## Common Pitfalls
- Handling gesture and gameplay in one giant component.
- Forgetting overlay state checks.
- No swipe threshold normalization for different screens.

## Debugging Checklist
- Log command events instead of raw pointer data.
- Verify one-handed thumb interaction.
- Ensure gestures disable while paused.

## Step-by-Step Practice Plan
1. Implement tap-to-jump with command dispatch.
2. Add swipe-down action with threshold tuning.
3. Add unit test for gesture classification.

## Mini Project Task
Add tap jump and swipe dash to One-Tap Runner.

## Interview Q&A
- Q: Why use command events for input?
- A: They decouple gesture detection from gameplay reaction.
- Q: How handle different screen sizes?
- A: Use relative thresholds based on viewport dimensions.

## Exit Criteria
- Gesture controls are responsive on Android devices.
- Input system remains modular and maintainable.
