# Exercise - Flutter Testing Strategy

## Part A - Core Implementation
Write at least one unit test, one widget test, and one higher-level flow test for a meaningful feature.

## Part B - Validation and Error Cases
Cover invalid form input, failed loading, or canceled navigation, not just the happy path.

## Part C - Reliability and Refactor
Refactor brittle assertions toward stable user-visible behavior and smaller focused fixtures.

## Constraints
- Test behavior, not private implementation detail.
- Include at least one negative path.
- Keep fixtures and setup readable.

## Acceptance Criteria
- Tests protect meaningful app behavior.
- Failure paths are represented.
- The suite is understandable and maintainable.

## Bonus Challenge
Document a minimal testing strategy for the rest of the app.

## Reflection Prompts
- Which test gave the highest confidence for the least cost?
- Which assertion was too coupled to implementation detail?
