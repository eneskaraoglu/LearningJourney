# Exercise - Flutter Local Storage and Persistence

## Part A - Core Implementation
Persist a user preference, draft form, or favorites list and restore it when the app reopens.

## Part B - Validation and Error Cases
Handle missing data, corrupted values, and first-run defaults safely.

## Part C - Reliability and Refactor
Extract persistence logic into a dedicated service and standardize storage keys and parsing behavior.

## Constraints
- Keep widgets free of low-level storage details.
- Define defaults for absent values.
- Test persistence across app restarts.

## Acceptance Criteria
- Stored data is restored correctly.
- Invalid or missing local data does not break the app.
- Persistence code is centralized and understandable.

## Bonus Challenge
Support a manual reset action that clears persisted values safely.

## Reflection Prompts
- Which persisted value needed the clearest default?
- What local-storage bug would be easy to miss without restart testing?
