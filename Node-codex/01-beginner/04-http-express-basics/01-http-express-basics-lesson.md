# HTTP Fundamentals and Express Basics

## Module Info
- Level: Beginner
- Recommended Session Time: 120 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Build Express routes and middleware correctly.
- Return meaningful status codes and JSON responses.
- Validate request body/query/path parameters.
- Apply centralized error-handling basics.

## Deep Dive
### HTTP Contract Mindset
Every endpoint is a contract. Define method, URL, request schema, success response, and error response. Keep this consistent for client developers.

### Middleware Pipeline
Requests pass through middleware in order. Use this for JSON parsing, auth checks, logging, and validation. Keep middleware single-purpose.

### Status Code Discipline
Use 200 for successful reads, 201 for creation, 204 for successful no-content actions, 400 for bad input, 404 for missing resources, 500 for unexpected server faults.

### Input Validation First
Validate early in route handlers or dedicated middleware so your business logic receives clean input.

## Worked Example
```js
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: 'title must be at least 3 chars' });
  }
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  return res.status(201).json(task);
});
```

## Common Pitfalls
- Throwing raw errors without a consistent response shape.
- Mutating shared in-memory arrays in ways that break tests.
- Not validating query params (page, limit) before usage.

## Debugging Checklist
- Use Postman/curl to verify both happy and failure paths.
- Log req.method and req.path in a minimal request logger.
- Write one Supertest case for each endpoint before refactor.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Build a task API with GET/POST/PATCH/DELETE.
2. Support done=true filter and simple pagination.
3. Add error middleware that always returns { message, code }.

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
