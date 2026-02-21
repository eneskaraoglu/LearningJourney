# Cheatsheet - Stack2-Godot

## Gameplay Loop
- Keep simulation frame-rate independent.
- Separate simulation, rendering, and UI overlay responsibilities.

## Architecture
- Game state machine: Boot -> Menu -> Playing -> Paused -> GameOver.
- Isolate services: audio, save, settings, score.

## Mobile Performance
- Avoid per-frame allocations.
- Reuse entities through pooling where supported.
- Validate low-end Android performance early.

## Shipping Basics
- Version code discipline.
- Crash logs and minimal analytics from day one.
- Keep release checklist in capstone folder.
