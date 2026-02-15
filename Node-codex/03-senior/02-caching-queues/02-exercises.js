/**
 * Caching and Background Jobs - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Cache Aside
// 1. Implement `getOrSet(key, ttlMs, loader)` with in-memory map or Redis client.
// 2. Track cache hit/miss counters.
// 3. Expire entries automatically using TTL.

// Part B - Invalidation Rules
// 1. After product update, invalidate related list/detail cache keys.
// 2. Document key naming convention.
// 3. Avoid stale reads after writes in your flow.

// Part C - Queue Worker
// 1. Model job payload for sending order confirmation email.
// 2. Implement worker with retry for transient errors only.
// 3. Move permanent failures to dead-letter collection.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - Cache layer is optional and does not break source-of-truth path.
// - Worker can reprocess job safely (idempotent behavior).
// - Failure paths are observable with logs/metrics.

// Bonus Challenge
// - Add exponential backoff strategy for retries.
// - Add dashboard endpoint exposing cache and queue counters.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
