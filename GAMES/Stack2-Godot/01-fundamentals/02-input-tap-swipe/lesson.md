# Input Handling: Tap and Swipe (Godot 4.x)

## Module Info
- Level: Intermediate
- Duration: 90 minutes
- Prerequisites: Delta time lesson complete, InputMap basics

## Learning Outcomes
- Capture tap and swipe gestures reliably.
- Convert raw touch events into gameplay commands.
- Separate gesture parsing from gameplay state decisions.

## Deep Dive
### Event Flow
Input events enter `_input(event)` and can be routed to a dedicated parser node.

### Gesture Detection
Track start position/time on touch down; on release compare distance and duration.

### Signal-Based Design
Emit `tap_received` and `swipe_received(direction)` signals to decouple gameplay.

## Worked Example
```gdscript
extends Node
signal tap_received
signal swipe_received(direction: Vector2)

var touch_start := Vector2.ZERO
var touch_start_time := 0

func _input(event: InputEvent) -> void:
    if event is InputEventScreenTouch and event.pressed:
        touch_start = event.position
        touch_start_time = Time.get_ticks_msec()
    elif event is InputEventScreenTouch and not event.pressed:
        var dt := Time.get_ticks_msec() - touch_start_time
        var delta_pos := event.position - touch_start
        if delta_pos.length() < 25.0 and dt < 220:
            tap_received.emit()
        elif delta_pos.length() >= 25.0:
            swipe_received.emit(delta_pos.normalized())
```

## Common Pitfalls
- Overly small swipe threshold causing accidental swipes.
- Reading touch directly in gameplay nodes everywhere.
- Ignoring UI overlay interactions.

## Debugging Checklist
- Log gesture type, duration, and distance.
- Verify taps on different device DPI scales.
- Ensure paused state blocks gameplay input.

## Step-by-Step Practice Plan
1. Build standalone `GestureInput` node.
2. Emit signals and wire to a player controller.
3. Tune threshold constants by playtesting.

## Mini Project Task
In One-Tap Runner, map tap to jump and swipe-down to fast-drop.

## Interview Q&A
- Q: Why emit signals from input parser?
- A: It keeps input reusable and gameplay code cleaner.
- Q: How reduce false positives?
- A: Tune thresholds and include duration checks.

## Exit Criteria
- Gesture parser is reusable and testable.
- Tap and swipe actions are stable on Android touch screens.
