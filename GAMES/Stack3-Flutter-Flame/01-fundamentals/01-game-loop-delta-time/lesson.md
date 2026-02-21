# Game Loop and Delta Time (Flutter + Flame)

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Dart OOP, Flutter widgets, basic Flame setup

## Learning Outcomes
- Understand `update(double dt)` and `render(Canvas)` responsibilities.
- Use dt to keep game speed consistent.
- Separate game simulation and overlay UI concerns.

## Deep Dive
### Flame Loop Model
Flame calls `update(dt)` for simulation and `render` for drawing.

### dt as the Truth
Movement, cooldowns, and score timers should scale by dt, never by frame count.

### Mobile Stability
Clamp extreme dt spikes after app resume so gameplay does not jump forward.

## Worked Example
```dart
class RunnerGame extends FlameGame {
  double distance = 0;
  final double speed = 220;

  @override
  void update(double dt) {
    super.update(dt);
    distance += speed * dt;
  }
}
```

## Common Pitfalls
- Moving objects in render.
- Not handling large dt after lifecycle resume.
- Coupling widget state directly into gameplay classes.

## Debugging Checklist
- Print dt percentiles during playtest.
- Pause/resume app and verify smooth recovery.
- Confirm speed parity at different FPS.

## Step-by-Step Practice Plan
1. Build a moving component using dt.
2. Add timer-based score.
3. Simulate low FPS and verify behavior.

## Mini Project Task
Implement ground scroll speed using dt in One-Tap Runner.

## Interview Q&A
- Q: Why is dt-based update mandatory?
- A: It decouples simulation speed from rendering frequency.
- Q: Where should menus live?
- A: In Flutter overlays, not game components.

## Exit Criteria
- Update loop is deterministic and frame-rate independent.
- Overlay UI does not block simulation architecture.
