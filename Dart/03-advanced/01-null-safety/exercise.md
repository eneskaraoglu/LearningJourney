# Exercise - Null Safety and Defensive Modeling in Dart

## Part A - Core Implementation
Model a user profile, task draft, or API response with a mix of required and optional fields using null safety correctly.

## Part B - Validation and Error Cases
Handle missing values from parsing or user input without relying on unsafe forced unwraps.

## Part C - Reliability and Refactor
Refactor overly nullable models to make required data non-nullable and defaults explicit.

## Constraints
- Use `!` only where the invariant is obvious and supported by code structure.
- Prefer null-aware operators over repetitive nested checks.
- Keep required fields truly required.

## Acceptance Criteria
- Optional and required data are clearly distinguished.
- Null-related failure paths are handled safely.
- The design becomes simpler, not noisier.

## Bonus Challenge
Add parsing helpers that convert nullable raw input into strongly typed models.

## Reflection Prompts
- Where were you tempted to use `!` too early?
- Which nullable field turned out to be better as required?
