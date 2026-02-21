# Game Loop and Delta Time (Godot 4.x)

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: GDScript basics, nodes/scenes, editor navigation

## Learning Outcomes
- Distinguish `_process(delta)` and `_physics_process(delta)`.
- Use delta for frame-rate independent movement.
- Choose update loop based on gameplay intent.

## Deep Dive
### `_process` vs `_physics_process`
- `_process(delta)` for render-aligned updates.
- `_physics_process(delta)` for collision-sensitive gameplay.

### Why Delta Matters
Without delta scaling, speed changes per device FPS and gameplay becomes unfair.

### Mobile Timing Strategy
Tie movement and timers to delta or fixed ticks, then validate on low-end Android devices.

## Worked Example
```gdscript
extends Node2D

@export var scroll_speed: float = 220.0
var distance_traveled: float = 0.0

func _process(delta: float) -> void:
    var step := scroll_speed * delta
    position.x -= step
    distance_traveled += step
```

## Common Pitfalls
- Using `_process` for collision-critical movement.
- Updating score by frame count.
- Mixing gameplay and UI in one node script.

## Debugging Checklist
- Confirm expected callback fires.
- Print delta and velocity when motion feels inconsistent.
- Verify physics FPS project setting.

## Step-by-Step Practice Plan
1. Move sprite with delta in `_process`.
2. Move same logic to `_physics_process` and compare.
3. Add pause flag and verify movement stops.

## Mini Project Task
Use fixed-step movement for runner obstacles and compare fairness at different frame rates.

## Interview Q&A
- Q: When should you choose `_physics_process`?
- A: For movement/collisions that must stay deterministic.
- Q: Why still use `_process`?
- A: For visual-only updates tied to render frames.

## Exit Criteria
- You can justify update loop choices per feature.
- Runner speed remains consistent across devices.
