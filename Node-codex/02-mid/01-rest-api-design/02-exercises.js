/**
 * REST API Design and Resource Modeling - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Resource Contract
// 1. Define product resource shape: id, name, category, price, createdAt.
// 2. Implement `GET /products` with stable JSON list response envelope.
// 3. Implement `GET /products/:id` with proper 404 response body.

// Part B - Query Features
// 1. Add pagination (`page`, `limit`) with defaults and max limit guard.
// 2. Add filtering by category and minPrice/maxPrice.
// 3. Add sorting by name and price with `sort` query param.

// Part C - Write Endpoints
// 1. Implement `POST /products` with request validation.
// 2. Implement `PATCH /products/:id` partial updates with validation.
// 3. Return consistent error body format from all endpoints.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - List and detail endpoints share predictable response contracts.
// - Pagination metadata includes total and pages.
// - Input validation prevents invalid states.

// Bonus Challenge
// - Write short API docs markdown for all endpoints.
// - Add versioned prefix `/api/v1` and discuss migration approach.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
