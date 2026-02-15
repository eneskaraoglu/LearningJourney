/**
 * Real-time Communication with WebSockets - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Socket Server Basics
// 1. Create Socket.IO server with connection/disconnection logs.
// 2. Emit welcome event on connection.
// 3. Add heartbeat/ping event to validate connectivity.

// Part B - Room Events
// 1. Implement `join-project` event to join room by projectId.
// 2. Emit `task-updated` only to project room.
// 3. Reject payloads missing projectId or taskId.

// Part C - Reliability
// 1. Acknowledge events with success/error callback payload.
// 2. Throttle or reject noisy clients (basic guard is enough).
// 3. Document event contracts in markdown.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - Room scoping prevents cross-project event leakage.
// - Validation errors are explicit and safe.
// - Server handles reconnect cycles without crashing.

// Bonus Challenge
// - Persist last 20 events per room for late joiners.
// - Bridge HTTP route updates to socket events in one flow.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
