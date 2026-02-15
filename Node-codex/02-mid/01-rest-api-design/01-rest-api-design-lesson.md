# REST API Design and Resource Modeling

## Module Info
- Level: Mid
- Recommended Session Time: 120-150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Model resources and relationships with consistent URL design.
- Implement pagination, sorting, and filtering in a predictable way.
- Standardize response envelopes and error bodies.
- Document API contracts for frontend and integration consumers.

## Deep Dive
### Resource Naming
Prefer nouns and plural resource names. Example: /users, /orders. Keep action verbs out of URL path where possible.

### Query Strategy
Use query params for filtering and pagination: /products?page=1&limit=20&category=hardware. Validate bounds to prevent expensive queries.

### Consistency Rules
Use one response pattern for list endpoints and one for single resource endpoints. This reduces client-side conditionals and bugs.

### Versioning Basics
When breaking contracts, expose /v2 or content-negotiation strategies. Never silently break existing clients.

## Worked Example
```js
function listResponse(data, page, limit, total) {
  return {
    data,
    meta: { page, limit, total, pages: Math.ceil(total / limit) }
  };
}
```

## Common Pitfalls
- Returning different shapes for similar endpoints.
- No default sort order, causing unstable pagination results.
- Ignoring max limit guard and allowing abuse-heavy queries.

## Debugging Checklist
- Re-run the same paginated query to check deterministic ordering.
- Test out-of-range page and invalid limit edge cases.
- Add request IDs to logs for easier incident tracing.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Design a catalog API for products and categories.
2. Implement list, detail, and search endpoints with shared response envelope.
3. Write short endpoint docs in markdown.

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
