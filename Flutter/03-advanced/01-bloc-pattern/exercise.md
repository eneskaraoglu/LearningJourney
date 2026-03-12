# Exercise - BLoC Pattern and Predictable State Flow

## Part A - Core Implementation
Implement one feature with explicit events, states, and transition logic such as loading, success, failure, and refresh.

## Part B - Validation and Error Cases
Handle duplicate actions, invalid transitions, and failed async operations cleanly.

## Part C - Reliability and Refactor
Refactor any UI-heavy state logic so the widget layer mainly renders state and dispatches intent.

## Constraints
- Keep event and state names descriptive.
- Avoid putting presentation-only details inside business logic.
- Use BLoC only where the feature complexity justifies it.

## Acceptance Criteria
- Event-to-state flow is understandable.
- Failure and retry states are explicit.
- The UI layer becomes simpler.

## Bonus Challenge
Add one side effect such as refresh or optimistic update and document the tradeoffs.

## Reflection Prompts
- Which transition was hardest to model explicitly?
- What complexity did BLoC remove and what complexity did it add?
