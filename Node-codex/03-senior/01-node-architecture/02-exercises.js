/**
 * Layered Architecture in Node.js - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Layer Split
// 1. Start from one mixed route handler and split into controller/service/repository files.
// 2. Controller: parse request and map response.
// 3. Service: validate business rules and orchestrate dependencies.

// Part B - Domain Errors
// 1. Create `DomainError` class with code field.
// 2. Throw specific codes (INVALID_EMAIL, EMAIL_EXISTS).
// 3. Map domain errors to HTTP statuses in centralized middleware.

// Part C - Testability
// 1. Inject repository dependency into service factory.
// 2. Write unit tests for service with mocked repository.
// 3. Verify no Express objects are required for service tests.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - No business logic left inside controller.
// - Domain error mapping is consistent across endpoints.
// - Service layer can be tested in isolation.

// Bonus Challenge
// - Add input schema validation middleware before controller.
// - Document architecture flow with a small ASCII diagram.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
