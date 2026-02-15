/**
 * Asynchronous Programming in Node.js - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Promise Basics
// 1. Implement `wait(ms)` returning a Promise that resolves after `ms`.
// 2. Write `simulateFetch(name, ms)` returning `{ name, loadedAt }` after delay.
// 3. Log order of execution to prove non-blocking behavior.

// Part B - Sequential vs Parallel
// 1. Create `loadSequential()` that awaits user -> orders -> profile.
// 2. Create `loadParallel()` that fetches orders and profile in parallel after user loads.
// 3. Measure total duration for both with `Date.now()` and compare.

// Part C - Error Handling
// 1. Make one async function randomly fail 30% of the time.
// 2. Handle failures with try/catch and return fallback object.
// 3. Log a structured error object with `source`, `message`, and `timestamp`.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - Uses async/await cleanly without nested `.then` chains.
// - Parallel flow is clearly faster than sequential in logs.
// - Unhandled promise rejections are eliminated.

// Bonus Challenge
// - Implement retry helper with max attempts and delay backoff.
// - Use `Promise.allSettled` and summarize success/failure counts.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
