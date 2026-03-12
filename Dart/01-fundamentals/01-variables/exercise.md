# Exercise - Variables and Immutability in Dart

## Part A - Core Implementation
Create a small script that stores app metadata, user profile values, and order totals using a mix of explicit types, `var`, `final`, and `const`.

## Part B - Validation and Error Cases
Review each declaration and document why it should or should not be mutable.

## Part C - Reliability and Refactor
Refactor unclear variable names and reduce mutable state to the minimum required.

## Constraints
- Use at least two `const` values and three `final` values.
- Do not use one-letter variable names.
- Keep each variable tied to one meaning only.

## Acceptance Criteria
- The script clearly separates configuration values from runtime values.
- Declaration choices are defensible and consistent.
- Naming is readable without extra comments.

## Bonus Challenge
Add a second version of the script showing a poor variable strategy, then list the maintenance problems it creates.

## Reflection Prompts
- Which values in real apps should almost always be immutable?
- Where did explicit types improve readability for you?
