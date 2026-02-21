# Exercise - Unity 2D Mobile Setup

## Part A - Core Implementation
- Create a new Unity LTS 2D project named OneTapRunnerPrototype.
- Build the full Assets folder structure from the lesson.
- Add Bootstrap scene and set it as first in Build Settings.
- Implement MobileBootstrap.cs and verify frame-rate lock.

## Part B - Validation and Error Cases
- Intentionally remove one required reference or setting and document the resulting issue.
- Fix the issue and add a short SETUP_NOTES.md with prevention steps.
- Validate orientation lock and safe-area behavior on your Android device.

## Part C - Reliability or Refactor
- Add ProjectValidator.cs editor/runtime helper that logs missing core folders at startup.
- Refactor hardcoded strings into constants.

## Constraints
- Keep scripts under Assets/Scripts/Core.
- No scene should contain unrelated prototype objects.
- No Console errors allowed in play mode.

## Acceptance Criteria
- Android development build installs and runs.
- Folder structure matches lesson exactly.
- Bootstrap behavior confirmed (FPS and sleep timeout).
- Setup notes document at least one failure and fix.

## Bonus Challenge
Add optional quality presets (Low, Medium, High) and toggle them from Inspector for quick device comparison.

## Reflection Prompts
- Which setup choice likely prevents the most future bugs?
- What did you verify on device that Editor did not reveal?
- Which part of your setup still feels fragile?
