/**
 * HTTP Fundamentals and Express Basics - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Core Routes
// 1. Create Express server with `GET /health` returning `{ ok: true }`.
// 2. Add `GET /tasks` returning in-memory task array.
// 3. Add `POST /tasks` to create task with auto-incremented id.

// Part B - Validation and Status Codes
// 1. Require `title` in POST body; return 400 when missing.
// 2. Add `PATCH /tasks/:id` for toggling `done` status.
// 3. Return 404 when task id does not exist.

// Part C - Middleware and Errors
// 1. Add request logger middleware printing method, path, and status.
// 2. Add error-handling middleware returning `{ message, code }`.
// 3. Ensure server never leaks stack traces in response bodies.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - Correct status codes are used for success and error flows.
// - Request body parsing works with JSON input.
// - Routes remain small and readable.

// Bonus Challenge
// - Add query filter `GET /tasks?done=true`.
// - Add pagination query params `page` and `limit`.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
