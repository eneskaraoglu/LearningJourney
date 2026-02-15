# Caching and Background Jobs

## Module Info
- Level: Senior
- Recommended Session Time: 150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Apply cache-aside pattern for read-heavy endpoints.
- Define safe cache invalidation rules.
- Move slow operations to background jobs.
- Design retry-safe idempotent workers.

## Deep Dive
### Cache-Aside Pattern
Try cache first. On miss, load from source of truth, then store with TTL. This reduces database pressure and latency.

### Invalidation Strategy
After data writes, invalidate related cache keys. Correct invalidation is more important than long TTL values.

### Background Job Design
Move non-user-blocking operations like emails, report generation, and heavy transforms to workers so HTTP responses stay fast.

### Idempotency and Retries
Workers should tolerate retries without duplicate side effects. Use idempotency keys or status checks before executing side effects.

## Worked Example
```js
async function getOrSet(cache, key, ttlMs, loader) {
  const hit = await cache.get(key);
  if (hit) return JSON.parse(hit);

  const data = await loader();
  await cache.set(key, JSON.stringify(data), 'PX', ttlMs);
  return data;
}
```

## Common Pitfalls
- Caching mutable objects without deep clone/serialization boundaries.
- No backoff policy for transient queue failures.
- Missing dead-letter handling for permanently failing jobs.

## Debugging Checklist
- Add cache hit/miss counters to quickly verify behavior.
- Log job id and attempt count for each worker execution.
- Replay failed job payloads in a local worker environment.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Cache product list endpoint with category filter keys.
2. Queue email notification jobs for order creation.
3. Implement retry + dead-letter simulation in memory.

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
