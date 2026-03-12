# Exercise - Async and Await in Dart

## Part A - Core Implementation
Build an async workflow that loads data, transforms it, and saves or prints a result using `Future`-returning helpers.

## Part B - Validation and Error Cases
Handle delayed failures, invalid responses, and timeout scenarios with clear error messages.

## Part C - Reliability and Refactor
Refactor long async methods into smaller steps and document where recovery should happen.

## Constraints
- Await all required asynchronous work explicitly.
- Keep error handling intentional.
- Do not bury network- or storage-like delays inside unrelated logic.

## Acceptance Criteria
- Async steps run in the expected order.
- Failure paths are observable and safe.
- The code remains readable under error handling.

## Bonus Challenge
Run two independent async operations concurrently and combine the results.

## Reflection Prompts
- Which async bug was hardest to spot?
- Where should retries or timeouts belong in the design?
