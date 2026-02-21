# Spawning and Difficulty Curves

## Module Info
- Level: Intermediate+
- Duration: 100 min
- Prerequisites: Intermediate 01

## Learning Outcomes
- Explain the core tradeoffs behind spawning and difficulty curves.
- Implement a maintainable version of this feature in a 2D mobile game.
- Diagnose and fix one common production issue related to this topic.

## Deep Dive
### Why this matters on mobile
Tune spawn timing and hazard composition with deterministic, testable progression rules.

### Core implementation pattern
- Start with one clear owner component for the feature.
- Expose only required fields in Inspector with safe defaults.
- Guard invalid states early with explicit checks and logs.

### Scaling the pattern
- Split reusable logic into service-style classes.
- Keep scene references light and testable.
- Track performance impact while adding polish.

## Worked Example
Use examples/ExampleScript.cs as the baseline. Attach it to a test scene object and validate behavior using Unity Profiler and Console.

## Common Pitfalls
- Mixing responsibilities in one monolithic MonoBehaviour.
- Assuming desktop input/performance behavior equals mobile behavior.
- Skipping negative-path tests (pause/resume, invalid config, low FPS).

## Debugging Checklist
- Confirm serialized references are assigned.
- Validate frame-rate independence and physics timing.
- Reproduce issue on Android device, not only in Editor.
- Check logs for null refs and repeated allocations.

## Step-by-Step Practice Plan
1. Build a minimal scene that only tests this concept.
2. Add one reliability check (clamp, null guard, timeout, or fallback).
3. Profile one performance metric before and after improvement.
4. Integrate into your mini-project with clear commit history.

## Mini Project Task
Add this lesson's concept to your current mini-project and document the integration result in the project README.

## Interview Q&A
- Q: Why is this pattern preferred in mobile Unity projects?
  A: It reduces runtime risk, keeps systems modular, and supports iterative tuning.
- Q: What failure mode appears most often?
  A: Hidden coupling between gameplay and scene-specific references.

## Exit Criteria
- Feature works on Android build.
- Negative path is handled.
- Code is readable, commented only where logic is non-obvious.
