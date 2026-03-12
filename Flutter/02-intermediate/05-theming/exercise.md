# Exercise - Flutter Theming and UI Consistency

## Part A - Core Implementation
Create a shared app theme and apply it across multiple screens, buttons, cards, and text styles.

## Part B - Validation and Error Cases
Fix inconsistent colors, typography, and spacing that break the visual system.

## Part C - Reliability and Refactor
Replace hardcoded style values with reusable theme references and app-level tokens.

## Constraints
- Avoid repeated literal style values where a shared theme would be clearer.
- Keep the visual system consistent across primary screens.
- Make theme updates practical from one central place.

## Acceptance Criteria
- Shared styling is visible across the app.
- Hardcoded style duplication is reduced.
- Theme decisions are easier to maintain.

## Bonus Challenge
Add light and dark theme support with a persisted preference.

## Reflection Prompts
- Which hardcoded style pattern was most expensive to clean up?
- What should belong in the theme versus a local widget style?
