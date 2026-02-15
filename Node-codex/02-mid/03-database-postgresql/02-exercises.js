/**
 * PostgreSQL Integration with node-postgres - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - DB Setup
// 1. Create SQL schema for `users` and `tasks` tables.
// 2. Initialize one shared `Pool` using `DATABASE_URL`.
// 3. Add startup check query `SELECT NOW()` with friendly failure message.

// Part B - Repository Functions
// 1. Implement `createUser`, `findUserByEmail`, `createTask`, `listTasksByUser`.
// 2. Use parameterized SQL only (`$1`, `$2` placeholders).
// 3. Map DB rows to plain JS objects returned by repository.

// Part C - Error Mapping and Transaction
// 1. Handle duplicate email constraint with app-level error code.
// 2. Implement transaction: create user + default welcome task.
// 3. Rollback transaction on failure and rethrow meaningful error.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - No string concatenation used for dynamic SQL values.
// - Transaction uses BEGIN/COMMIT/ROLLBACK correctly.
// - Repository layer remains independent from Express req/res.

// Bonus Challenge
// - Add simple migration script with up/down SQL files.
// - Add index and compare query plan before/after index.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
