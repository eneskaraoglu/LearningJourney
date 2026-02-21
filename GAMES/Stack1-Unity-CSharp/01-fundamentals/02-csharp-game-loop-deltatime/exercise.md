# Exercise - C# Game Loop and deltaTime

## Part A - Core Implementation
- Create GameStateController with states: Start, Playing, GameOver.
- Implement runner movement that starts on first tap.
- Implement score timer that increments once per second while playing.

## Part B - Validation and Error Cases
- Add guard against invalid state transitions.
- Simulate low FPS by setting target FPS to 30 and verify gameplay speed remains stable.
- Ensure score does not increase in Start or GameOver states.

## Part C - Reliability or Refactor
- Extract timer logic into reusable TickTimer helper.
- Add one debug UI text showing current state and FPS.

## Constraints
- Use deltaTime for continuous motion and timers.
- Do not use static globals for gameplay state.
- Keep each script single-purpose.

## Acceptance Criteria
- Movement consistency at 30/60 FPS.
- No Console errors during state transitions.
- Retry flow resets movement and score correctly.

## Bonus Challenge
Add pause/resume support using OnApplicationPause(bool paused) and keep state behavior correct.

## Reflection Prompts
- Which logic belongs in Update versus FixedUpdate in your implementation?
- What edge case broke first when you forced low FPS?
- What small refactor improved clarity most?
