# 2D Movement Systems

## Module Info
- Level: Intermediate
- Duration: 75-120 minutes
- Prerequisites: Basic programming, OOP fundamentals, and Flutter stable + Flame basics

## Learning Outcomes
- Explain and implement movement controllers and smoothing in a mobile 2D context.
- Build a clean, testable gameplay unit with explicit responsibilities.
- Validate behavior under normal and edge-case runtime conditions.

## Deep Dive
### Concept Model
movement controllers and smoothing drives responsiveness and fairness in short-session mobile games.

### Implementation Pattern
Use a small controller that delegates to focused helpers.

### Mobile Constraints
Respect frame budget, avoid allocations in loops, and design for variable touch precision.

## Worked Example
```text
import 'package:flame/components.dart';

class PlayerComponent extends PositionComponent {
  PlayerComponent() {
    size = Vector2.all(48);
  }

  @override
  void update(double dt) {
    super.update(dt);
    // Keep all movement calculations tied to dt.
  }
}

```

## Common Pitfalls
- Mixing gameplay state transitions with rendering side effects.
- Hardcoding timings and speeds across multiple scripts.
- Ignoring paused state while updates continue.

## Debugging Checklist
- Verify update function runs in expected mode only.
- Confirm timing uses delta/dt and not frame assumptions.
- Trace event order for input -> gameplay -> UI feedback.

## Step-by-Step Practice Plan
1. Implement smallest playable behavior.
2. Add validation and failure handling.
3. Add tuning variables for design iteration.
4. Run 5-minute mobile stress playtest.

## Mini Project Task
Integrate this system into One-Tap Runner and compare behavior before/after.

## Interview Q&A
- Q: Why prefer explicit game states in casual mobile games?
- A: They reduce hidden transitions and make bugs reproducible.
- Q: Why is frame-rate independent logic mandatory?
- A: Mobile devices vary widely in refresh rate and load.

## Exit Criteria
- Feature behaves correctly at 30/60/90+ FPS.
- Code boundaries are clear and easy to extend.
- At least 3 edge cases are handled and tested manually.
