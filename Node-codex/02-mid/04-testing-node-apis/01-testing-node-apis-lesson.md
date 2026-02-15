# Testing Node APIs (Vitest + Supertest)

## Module Info
- Level: Mid
- Recommended Session Time: 120-150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Write unit tests for pure business logic.
- Write API integration tests for route contracts.
- Use deterministic test setup and teardown.
- Design tests to catch regressions early.

## Deep Dive
### Test Pyramid for Node
Use many fast unit tests, a smaller number of integration tests, and a minimal set of end-to-end tests. This balances confidence and speed.

### Supertest Pattern
Supertest lets you run requests directly against your Express app without binding to a real network port.

### Deterministic Data
Each test should set up its own data and avoid dependence on execution order. Use beforeEach to reset state.

### Meaningful Assertions
Assert status code, payload structure, and key business fields. Avoid broad assertions that allow subtle regressions.

## Worked Example
```js
it('POST /items returns 400 when name is missing', async () => {
  const res = await request(app).post('/items').send({});
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('name required');
});
```

## Common Pitfalls
- Testing implementation details instead of observable behavior.
- Shared mutable state leaking between tests.
- Skipping negative-path tests for validation and auth.

## Debugging Checklist
- Run a single test file during investigation to shorten feedback loop.
- Add temporary console logs for response bodies when assertions fail.
- Use --runInBand style serial execution when debugging race conditions.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Write full test suite for a task API.
2. Cover create/read/update/delete + validation failures.
3. Add one mocked service dependency test.

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
