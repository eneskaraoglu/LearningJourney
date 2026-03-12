# Exercise - Functions and Reusable Logic in Dart

## Part A - Core Implementation
Build a command-line utility with separate functions for input parsing, validation, calculation, and formatted output.

## Part B - Validation and Error Cases
Return meaningful failure messages for missing or invalid arguments instead of allowing bad data into calculations.

## Part C - Reliability and Refactor
Refactor duplicated logic and convert ambiguous argument lists to named parameters.

## Constraints
- Each function should have one main responsibility.
- Use named parameters where they improve call-site clarity.
- Avoid relying on mutable global variables.

## Acceptance Criteria
- The script is organized into small testable functions.
- Failure paths are handled consistently.
- Reused logic is extracted cleanly.

## Bonus Challenge
Add a higher-level function that orchestrates the full workflow and logs each stage.

## Reflection Prompts
- Which function boundary was hardest to choose?
- What side effects did you remove during refactoring?
