# Exercise - Flutter Navigation and Screen Flow

## Part A - Core Implementation
Build a small app flow with at least three screens: list, detail, and create or edit.

## Part B - Validation and Error Cases
Handle missing route arguments, canceled actions, and unsaved changes thoughtfully.

## Part C - Reliability and Refactor
Refactor duplicated navigation code and make screen transitions easier to reason about.

## Constraints
- Keep route data explicit.
- Test both forward and backward navigation.
- Avoid burying navigation side effects in unrelated widgets.

## Acceptance Criteria
- Screen flow is predictable.
- Error or cancel paths do not break the app.
- Navigation code is readable and maintainable.

## Bonus Challenge
Return a result from a child screen and update the previous screen correctly.

## Reflection Prompts
- Which navigation path felt easiest to break?
- Where should navigation responsibility live in this app?
