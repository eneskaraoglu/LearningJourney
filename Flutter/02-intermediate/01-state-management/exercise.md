# Exercise - Flutter State Management Foundations

## Part A - Core Implementation
Build a small feature with local state, shared derived state, and visible UI updates such as filters, counters, or selected items.

## Part B - Validation and Error Cases
Handle stale selections, empty data, and loading transitions without inconsistent UI.

## Part C - Reliability and Refactor
Refactor state so there is a clear source of truth and minimal duplicated UI logic.

## Constraints
- Keep state as local as practical.
- Avoid mutating shared data from many places.
- Make loading and empty states explicit.

## Acceptance Criteria
- UI updates reflect state changes predictably.
- Edge states are handled.
- State ownership is easy to explain.

## Bonus Challenge
Add derived state such as filtered counts or grouped summaries.

## Reflection Prompts
- Which state initially lived in the wrong place?
- What made the source of truth clearer?
