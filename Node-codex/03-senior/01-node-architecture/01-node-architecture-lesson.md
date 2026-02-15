# Layered Architecture in Node.js

## Module Info
- Level: Senior
- Recommended Session Time: 150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Separate HTTP concerns, business rules, and data access cleanly.
- Model domain errors and map them consistently.
- Apply dependency injection for testability.
- Refactor monolithic handlers into composable layers.

## Deep Dive
### Controller Responsibilities
Controllers parse request input, call service methods, and map outputs/errors to HTTP responses. They should not contain business rules or SQL.

### Service Responsibilities
Services enforce domain rules and orchestration. They are the core of application behavior and should be easy to unit test.

### Repository Responsibilities
Repositories handle persistence and queries. Keep them thin and focused on data retrieval/storage concerns.

### Error Mapping Strategy
Define domain-specific errors (for example INVALID_EMAIL) and map each to HTTP status and stable API error codes.

## Worked Example
```js
class DomainError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

function mapError(err) {
  if (err.code === 'INVALID_EMAIL') return { status: 400, code: err.code };
  if (err.code === 'EMAIL_EXISTS') return { status: 409, code: err.code };
  return { status: 500, code: 'INTERNAL' };
}
```

## Common Pitfalls
- Calling repository directly from controllers in random places.
- Throwing generic Error everywhere without domain codes.
- Service methods that mutate global state silently.

## Debugging Checklist
- Unit test service methods with mocked repository inputs.
- Trace request lifecycle with request ID from controller to repository.
- Review error mapping table when response statuses look inconsistent.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Refactor one existing API from single-file routes to layered architecture.
2. Add explicit domain errors and mapping middleware.
3. Write service-level tests before and after refactor.

## Interview Q&A
### Q1: What problem does this module solve in real backend systems?
It improves reliability and maintainability by applying focused patterns instead of ad-hoc code changes.

### Q2: How do you test this area effectively?
Use unit tests for core logic and targeted integration tests for boundary behavior and error handling.

### Q3: What tradeoff should you be ready to explain?
Be explicit about complexity vs scalability. Prefer the simplest design that still satisfies reliability and growth requirements.

## Exit Criteria
- You can explain this module without reading notes.
- You can implement the core pattern from memory.
- You can describe one production risk and mitigation strategy.
