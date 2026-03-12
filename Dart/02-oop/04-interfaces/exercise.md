# Exercise - Interfaces and Contracts in Dart

## Part A - Core Implementation
Design an interface for a repository, logger, notifier, or persistence layer, then implement two concrete versions.

## Part B - Validation and Error Cases
Handle unsupported operations, empty data, or failed save attempts consistently across implementations.

## Part C - Reliability and Refactor
Refactor calling code so it depends only on the interface and not on implementation details.

## Constraints
- The interface must have a single clear responsibility.
- Implementations must honor the same behavioral contract.
- Avoid leaking storage-specific details into callers.

## Acceptance Criteria
- Two implementations can be swapped with minimal caller changes.
- Error behavior is predictable.
- The abstraction improves readability rather than hiding confusion.

## Bonus Challenge
Add a fake implementation for testing or local experimentation.

## Reflection Prompts
- Was the abstraction justified by a real variation point?
- Which implementation-specific detail was hardest to hide?
