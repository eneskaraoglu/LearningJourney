# Audio Systems

## Module Info
- Level: Intermediate
- Duration: 75-120 minutes
- Prerequisites: Basic programming, OOP fundamentals, and Godot 4.x + GDScript basics

## Learning Outcomes
- Explain and implement SFX and music routing in a mobile 2D context.
- Build a clean, testable gameplay unit with explicit responsibilities.
- Validate behavior under normal and edge-case runtime conditions.

## Deep Dive
### Concept Model
SFX and music routing drives responsiveness and fairness in short-session mobile games.

### Implementation Pattern
Use a small controller that delegates to focused helpers.

### Mobile Constraints
Respect frame budget, avoid allocations in loops, and design for variable touch precision.

## Worked Example
```text
extends CharacterBody2D

@export var speed: float = 180.0

func _physics_process(delta: float) -> void:
    var dir := Vector2.ZERO
    dir.x = Input.get_action_strength("ui_right") - Input.get_action_strength("ui_left")
    dir.y = Input.get_action_strength("ui_down") - Input.get_action_strength("ui_up")
    velocity = dir.normalized() * speed
    move_and_slide()

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
