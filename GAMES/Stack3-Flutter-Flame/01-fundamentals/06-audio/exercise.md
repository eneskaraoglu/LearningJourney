# Exercise - Audio Systems

## Part A - Core Implementation
Build the core feature with a clean controller + helper structure.

## Part B - Validation and Error Cases
Add guard logic for invalid input/state and log meaningful diagnostics.

## Part C - Reliability and Refactor
Extract reusable methods, remove duplication, and document tuning knobs.

## Constraints
- Keep frame-rate independent behavior.
- Do not allocate gameplay objects every frame.
- Keep scripts/classes focused on one responsibility.

## Acceptance Criteria
- Core flow works on desktop and Android test run.
- Invalid states are handled without crashing.
- Code is readable, named clearly, and easy to debug.

## Bonus Challenge
Add a small metrics hook (events/timers) to profile this feature.

## Reflection Prompts
- Which part became hard to test and why?
- What would you change before shipping this to production?
