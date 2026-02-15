# File System and Path Operations

## Module Info
- Level: Beginner
- Recommended Session Time: 90-120 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Use fs/promises for non-blocking file I/O.
- Build cross-platform safe paths with path.join and path.resolve.
- Create and update files with validation and error handling.
- Model simple persistence using JSON files.

## Deep Dive
### Why path Module Matters
Windows and Unix path separators differ. path.join keeps your code portable and reduces path bugs in team environments.

### fs/promises Pattern
Prefer await fs.readFile/writeFile for readable and maintainable asynchronous I/O. Wrap operations in try/catch and include context in error messages.

### Safe Write Strategy
Before writing, validate content and ensure directories exist. For critical writes use temporary files and rename for atomic update behavior.

### JSON as Learning Storage
For beginner projects, JSON files are a good stepping stone before real databases. Keep schema stable and validate fields explicitly.

## Worked Example
```js
const fs = require('fs/promises');
const path = require('path');

async function saveTodo(todo) {
  const dir = path.join(__dirname, 'data');
  const file = path.join(dir, 'todos.json');
  await fs.mkdir(dir, { recursive: true });

  const current = JSON.parse(await fs.readFile(file, 'utf8').catch(() => '[]'));
  current.push(todo);
  await fs.writeFile(file, JSON.stringify(current, null, 2), 'utf8');
}
```

## Common Pitfalls
- Blocking the event loop with sync file APIs in request handlers.
- Assuming file exists without handling ENOENT errors.
- Writing malformed JSON by concatenating strings instead of using JSON.stringify.

## Debugging Checklist
- Log absolute paths before read/write operations.
- Catch and print error.code (ENOENT, EACCES) to identify root cause.
- Validate JSON parsing with small test files first.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Create a simple notes CLI with add/list/delete commands.
2. Store notes in a JSON file under a data folder.
3. Add duplicate title validation.

## Interview Q&A
### Q1: What problem does this module solve in real backend systems?
It improves reliability and maintainability by applying focused patterns instead of ad-hoc code changes.

### Q2: How do you test this area effectively?
Use unit tests for core logic and targeted integration tests for boundary behavior and error handling.

### Q3: What tradeoff should you be ready to explain?
Be explicit about complexity vs scalability. Prefer the simplest design that still satisfies reliability and growth requirements.

## Exit Criteria
- You can explain this module without reading notes.
- You can implement the core pattern from memory.
- You can describe one production risk and mitigation strategy.
