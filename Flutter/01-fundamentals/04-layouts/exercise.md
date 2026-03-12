# Exercise - Flutter Layouts and Constraint Thinking

## Part A - Core Implementation
Build a multi-section screen with headers, list content, spacing, and an action area using proper layout widgets.

## Part B - Validation and Error Cases
Handle narrow screens, long text, and empty list states without overflow or clipped UI.

## Part C - Reliability and Refactor
Refactor fixed-size layout decisions into more responsive structures using `Expanded`, `Flexible`, or scroll containers.

## Constraints
- Test with at least one compact screen size.
- Avoid magic numbers for all sizing decisions.
- Keep scroll behavior intentional.

## Acceptance Criteria
- No obvious overflow warnings remain.
- Layout adapts reasonably to smaller devices.
- Spacing and hierarchy stay readable.

## Bonus Challenge
Add a second layout variant for tablet or landscape width.

## Reflection Prompts
- Which parent constraint caused the hardest bug?
- Where did flexibility improve the design most?
