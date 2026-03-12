# Exercise - Collections and Data Processing in Dart

## Part A - Core Implementation
Create a transaction-processing script that reads a list of items, groups them by category, and calculates totals and counts.

## Part B - Validation and Error Cases
Handle duplicate IDs, missing map keys, empty lists, and invalid category names.

## Part C - Reliability and Refactor
Refactor raw map access into helper functions or typed wrappers to reduce casting and repeated key lookups.

## Constraints
- Use a list for input records, a map for grouped summaries, and a set where uniqueness matters.
- Do not mutate a collection inside a loop unless you fully control the side effects.
- Keep summary logic deterministic.

## Acceptance Criteria
- Grouped totals are correct.
- Invalid records are detected and reported.
- Collection choices are appropriate and readable.

## Bonus Challenge
Sort the final output by highest total or alphabetical category name.

## Reflection Prompts
- Where did raw map access become brittle?
- Which collection type improved the design the most?
