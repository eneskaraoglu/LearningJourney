# Node Runtime and Module System

## Module Info
- Level: Beginner
- Recommended Session Time: 90-120 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Explain how Node.js runs JavaScript outside the browser.
- Use process, Buffer, __dirname, and environment variables safely.
- Split code into modules using CommonJS and understand ESM differences.
- Design small reusable modules with clear function contracts.

## Deep Dive
### How Node Executes Code
Node uses the V8 engine and libuv. V8 executes JavaScript, while libuv provides the event loop and async I/O primitives. This means your JavaScript can stay single-threaded for app logic while I/O operations are handled efficiently in the background.

### Useful Runtime Globals
Use process.version, process.platform, process.cwd(), process.env, __dirname, and __filename for runtime context. Avoid hard-coding absolute paths. Use process.env for secrets and deployment-specific values.

### CommonJS vs ESM
CommonJS uses require/module.exports and loads synchronously. ESM uses import/export and has static analysis benefits. In many production backends you will see CommonJS in older codebases and ESM in newer ones.

### Module Design Rule
Each module should have one reason to change. Keep modules small and export focused functions. Avoid side effects when importing modules because side effects make testing harder.

## Worked Example
```js
// math.js
function add(a, b) { return a + b; }
function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}
module.exports = { add, divide };

// app.js
const math = require('./math');
console.log(math.add(4, 5));
console.log(math.divide(10, 2));
```

## Common Pitfalls
- Mixing ESM and CommonJS without understanding project config (package.json type field).
- Reading environment variables without fallback/default validation.
- Placing too much logic in one file and calling it modular architecture.

## Debugging Checklist
- Log process.cwd() and __dirname when file paths fail.
- Use node --trace-warnings if module import warnings appear.
- Check package.json and Node version when import/export syntax breaks.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Create a calculator CLI with separate modules for arithmetic and formatting.
2. Read two numbers from process.argv.
3. Print result and graceful error messages for invalid input.

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
