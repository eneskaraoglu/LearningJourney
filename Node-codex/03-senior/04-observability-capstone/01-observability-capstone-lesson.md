# Observability and Capstone Implementation

## Module Info
- Level: Senior
- Recommended Session Time: 180 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Implement structured logging with request correlation.
- Track service-level metrics for latency and errors.
- Adopt tracing mindset for distributed flows.
- Define and execute a production-ready capstone plan.

## Deep Dive
### Structured Logging
Log JSON objects with stable keys such as requestId, path, status, durationMs. Structured logs are machine-parseable and easier to query in log systems.

### Metrics That Matter
Track request count, error rate, p95 latency, queue depth, and cache hit ratio. These metrics expose service health and user experience.

### Correlation and Tracing
Propagate request IDs through HTTP calls and jobs. This creates an end-to-end story across components during incident debugging.

### Capstone Scope
Your final project should include auth, CRUD, validation, testing, observability, and deployment documentation. Focus on quality and consistency over feature count.

## Worked Example
```js
function requestLogger(req, res, next) {
  const startedAt = Date.now();
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    console.log(JSON.stringify({
      requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Date.now() - startedAt
    }));
  });

  next();
}
```

## Common Pitfalls
- Logging unstructured free-text lines only.
- No distinction between warning-level and error-level events.
- Building capstone without tests and deploy checklist.

## Debugging Checklist
- Simulate failures and verify logs include correlation IDs.
- Track latency distribution before and after optimization changes.
- Run a lightweight load test and inspect error trends.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Deliver a mini production API with auth, tasks, and analytics endpoints.
2. Add logs, counters, and latency tracking middleware.
3. Write README with architecture diagram and deployment/run instructions.

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
