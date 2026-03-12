# Exercise - Data Types and Type Safety in Dart

## Part A - Core Implementation
Create a billing summary script with typed fields for item count, unit price, discount, status, and customer name.

## Part B - Validation and Error Cases
Handle invalid numeric input such as empty strings, negative prices, or malformed decimal values.

## Part C - Reliability and Refactor
Extract parsing and formatting into separate helper functions so the core calculation stays clean.

## Constraints
- Keep monetary calculations numeric until the final output line.
- Use booleans for status flags instead of string literals.
- Reject invalid numeric input with meaningful messages.

## Acceptance Criteria
- Valid input produces correct totals.
- Invalid input does not crash the script silently.
- Helper functions clearly separate parsing, calculation, and output.

## Bonus Challenge
Support tax and discount percentages with rounded output.

## Reflection Prompts
- Which bugs came from type conversion rather than business logic?
- Where would stronger typing save time in a larger project?
