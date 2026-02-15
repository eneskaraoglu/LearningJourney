/**
 * Node Runtime and Module System - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Runtime Inspection
// 1. Create a script `runtime-info.js` and print: Node version, platform, current working directory, and script directory.
// 2. Read `APP_MODE` from environment variables; default to `development` when missing.
// 3. Print command line arguments after slicing `process.argv`.

// Part B - Module Extraction
// 1. Create `math-utils.js` exporting `add`, `subtract`, `multiply`, `divide`.
// 2. In `divide`, throw an Error for divide-by-zero and include message `DIVIDE_BY_ZERO`.
// 3. Create `app.js` that imports module and runs 5 sample operations.

// Part C - Input Validation
// 1. Accept two numbers and an operation from CLI args: `node app.js 10 2 divide`.
// 2. Validate operation against allowed list.
// 3. Return human-readable error if input is invalid.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - Code is split into at least two files.
// - Invalid input paths are handled without crashing silently.
// - Error messages are explicit enough for beginners to debug.

// Bonus Challenge
// - Add ESM version (`type: module`) and compare import/export syntax.
// - Add tiny test file that asserts divide-by-zero throws.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
