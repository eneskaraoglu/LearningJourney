# Exercise - Rewarded Flow Mock

## Part A - Core Implementation
Implement the baseline behavior in a fresh test scene using one primary script and clear Inspector fields.

## Part B - Validation and Error Cases
Handle invalid references, bad user input, and one runtime edge case (pause/resume or restart).

## Part C - Reliability or Refactor
Refactor to reduce coupling (events/service/helper class) and add one measurable reliability improvement.

## Constraints
- Use frame-rate-independent movement/timers when applicable.
- Keep methods focused; avoid giant Update blocks.
- Add comments only for non-obvious decisions.

## Acceptance Criteria
- Works in Editor and Android test build.
- No Console errors during 3-minute play session.
- Behavior remains correct at 30 FPS and 60 FPS.

## Bonus Challenge
Add a lightweight debug overlay showing one runtime metric relevant to this lesson.

## Reflection Prompts
- What bug was hardest to isolate and why?
- Which boundary between systems is still too coupled?
- What would you change before shipping this to production?
