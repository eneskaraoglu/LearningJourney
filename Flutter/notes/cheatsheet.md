# Flutter Cheatsheet

## Core Workflow
- `flutter doctor`
- `flutter create app_name`
- `flutter run`
- `flutter test`

## UI Basics
- Use small widgets.
- Prefer composition over giant screens.
- Understand constraints before changing child sizes.

## State
- Keep state local until it must be shared.
- Separate rendering from side effects.
- Make loading, empty, success, and error states explicit.

## Data Flow
- Parse JSON into typed models early.
- Keep API and storage code outside widgets.
- Persist only what the app truly needs across restarts.

## Quality Reminders
- Handle invalid input visibly.
- Test major user flows and edge states.
- Measure performance before optimizing.
