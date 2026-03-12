# Exercise - Flutter Networking and API Integration

## Part A - Core Implementation
Connect a screen to a remote or mocked API, fetch a list of items, and render loading and success states.

## Part B - Validation and Error Cases
Handle invalid JSON, empty responses, network errors, and retry flows cleanly.

## Part C - Reliability and Refactor
Move HTTP and parsing logic into a service layer and keep UI focused on rendering state.

## Constraints
- Use typed models after parsing.
- Make failure states visible and actionable.
- Do not put parsing-heavy code directly inside `build()`.

## Acceptance Criteria
- Data loads and renders correctly.
- Failure and retry flows work.
- Service and UI responsibilities are separated.

## Bonus Challenge
Add pagination, search, or refresh behavior.

## Reflection Prompts
- Which network failure was easiest to ignore at first?
- What parsing assumption felt most fragile?
