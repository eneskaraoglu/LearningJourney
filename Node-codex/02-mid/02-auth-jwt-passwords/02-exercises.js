/**
 * Authentication: Password Hashing and JWT - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Password Handling
// 1. Create `hashPassword` and `verifyPassword` using bcrypt.
// 2. Enforce minimum password length and one special character.
// 3. Never log plain text passwords to console.

// Part B - Auth Endpoints
// 1. Implement `POST /auth/register` storing hashed password.
// 2. Implement `POST /auth/login` returning access token on success.
// 3. Return generic error for wrong credentials to avoid user enumeration.

// Part C - Protected Routes
// 1. Create auth middleware reading `Authorization: Bearer <token>`.
// 2. Protect `GET /me` and return current user profile.
// 3. Return 401 for missing/invalid/expired tokens.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - JWT secret is loaded from environment variable.
// - Passwords are hashed and compared correctly.
// - Protected route behavior is deterministic.

// Bonus Challenge
// - Add role claim and admin-only route middleware.
// - Add refresh token flow with token rotation sketch.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
