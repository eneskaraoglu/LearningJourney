# Exercise - Streams and Event-Driven Data in Dart

## Part A - Core Implementation
Create a stream that emits progress updates, notifications, or sensor-like values over time and consume it in a listener.

## Part B - Validation and Error Cases
Handle stream errors, unexpected events, and listener cancellation safely.

## Part C - Reliability and Refactor
Extract transformation logic from listeners and make the stream contract easier to understand.

## Constraints
- Use a stream only because multiple events are expected.
- Keep subscription lifecycle explicit.
- Make event shape and meaning clear.

## Acceptance Criteria
- Events arrive in a predictable sequence.
- Errors and completion are handled properly.
- Listener code stays readable.

## Bonus Challenge
Add filtering, mapping, or buffering behavior before events reach the final consumer.

## Reflection Prompts
- What made the stream harder or easier than a future?
- Where could subscription leaks happen in a larger app?
