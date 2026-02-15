# Java Basics

## Module Info
- Level: Beginner
- Recommended Session Time: 120-150 minutes
- Prerequisite: Basic programming logic and command-line usage.

## Learning Outcomes
- Explain the core implementation decisions in Java Basics with concrete examples.
- Build a small but complete feature using the module pattern.
- Handle validation and error paths without breaking contract behavior.
- Describe testing and observability priorities for this topic.

## Deep Dive
### Core Mechanics
Master fundamental language/runtime behavior before introducing advanced abstractions.

### Design Decisions
Prefer simple, explicit code with clear naming and predictable side effects.

### Error Handling
Handle invalid input and exceptional paths deliberately with informative errors.

### Testing Approach
Use small repeatable tests to validate behavior and prevent regressions.

## Worked Example
```java
public static int safeDivide(int a, int b) {
  if (b == 0) throw new IllegalArgumentException("DIVIDE_BY_ZERO");
  return a / b;
}
```

## Common Pitfalls
- Over-engineering before requirements are clear.
- Ignoring failure scenarios and validating only happy paths.
- Mixing domain logic, transport concerns, and persistence code in one place.
- Skipping tests until after complexity has already increased.

## Debugging Checklist
- Reproduce with the smallest possible failing input.
- Log key state transitions and boundary inputs.
- Validate configuration, environment values, and dependency wiring.
- Confirm error responses are consistent and actionable.

## Step-by-Step Practice Plan
1. Recreate the worked example from scratch without copy-paste.
2. Add one deliberate bug and trace how you detect it.
3. Solve `02-exercises.md` in order (Part A to Part C).
4. Compare your approach with `03-solutions.md` and refactor one section.

## Mini Project Task
1. Implement one focused feature using this module topic.
2. Add validation for at least two invalid input cases.
3. Add one integration-level test and one unit-level test.
4. Document one reliability risk and mitigation.

## Interview Q&A
### Q1: What problem does this module solve in production systems?
It reduces ambiguity and failure risk by applying explicit design, validation, and operational patterns.

### Q2: How do you test this area efficiently?
Start with deterministic unit tests for rules, then add integration tests at framework boundaries.

### Q3: Which tradeoff should you be ready to justify?
Simplicity versus flexibility: keep the design as simple as possible while preserving correctness and maintainability.

## Exit Criteria
- You can implement the core pattern without notes.
- You can explain at least three failure cases and their handling.
- You can describe the minimum test set required before shipping.
