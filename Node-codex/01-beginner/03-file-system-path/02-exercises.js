/**
 * File System and Path Operations - Extended Exercises
 *
 * Goal: Build production-style habits while practicing module concepts.
 * Rule: Complete tasks in order. Do not open 03-solutions.js until done.
 */

// Part A - Safe Paths and Directories
// 1. Create `data/` directory with `fs.mkdir(..., { recursive: true })`.
// 2. Build file paths only using `path.join`.
// 3. Print absolute path using `path.resolve`.

// Part B - Notes Persistence
// 1. Create `notes.json` if missing and initialize as empty array.
// 2. Implement `addNote(title, content)` that appends new note object.
// 3. Implement `listNotes()` returning all notes.

// Part C - Data Integrity
// 1. Reject duplicate titles (case-insensitive).
// 2. Reject empty title/content values.
// 3. Add `deleteNote(title)` and return whether deletion happened.

// Constraints
// - Use clear function names and small functions.
// - Add explicit input validation where relevant.
// - Keep error messages user-friendly and debuggable.

// Acceptance Criteria
// - All file operations use async fs/promises APIs.
// - JSON read/write does not corrupt data formatting.
// - Validation errors are understandable.

// Bonus Challenge
// - Add `updatedAt` timestamps and sort by recent update.
// - Write operations through temp file + rename for safer updates.

// Reflection Prompts
// 1. Which part was hardest and why?
// 2. What bug did you hit and how did you debug it?
// 3. What would you refactor before shipping this?

// TODO: Implement your solution below.
