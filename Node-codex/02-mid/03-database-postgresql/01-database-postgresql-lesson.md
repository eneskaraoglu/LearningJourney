# PostgreSQL Integration with node-postgres

## Module Info
- Level: Mid
- Recommended Session Time: 150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Connect Node apps to PostgreSQL using pools.
- Write parameterized SQL queries safely.
- Organize repository layer functions for maintainability.
- Handle common database errors predictably.

## Deep Dive
### Pool Management
Create one Pool per app process and reuse it. Creating a new connection per request wastes resources and hurts latency.

### Parameterized Queries
Use placeholders ($1, $2, ...) to prevent SQL injection and to keep query plans reusable.

### Repository Layer
Keep SQL access in repository functions so controllers and services focus on transport/business logic.

### Error Handling
Map unique constraint errors (such as duplicate email) to domain-level messages and correct HTTP status codes.

## Worked Example
```js
async function createUser(db, input) {
  const sql = `
    INSERT INTO users(name, email)
    VALUES ($1, $2)
    RETURNING id, name, email
  `;
  const { rows } = await db.query(sql, [input.name, input.email]);
  return rows[0];
}
```

## Common Pitfalls
- Concatenating values directly into SQL strings.
- No database indexes on frequently queried columns.
- Mixing transaction and non-transaction queries incorrectly.

## Debugging Checklist
- Log SQL operation names (not full sensitive SQL) around failures.
- Inspect PostgreSQL error code (for example, 23505 unique violation).
- Use EXPLAIN ANALYZE when queries slow down.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Create users and tasks tables with one-to-many relationship.
2. Build repository functions for CRUD and filtered list queries.
3. Add one transaction example (create user + default task).

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
