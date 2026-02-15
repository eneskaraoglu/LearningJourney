# Asynchronous Programming in Node.js

## Module Info
- Level: Beginner
- Recommended Session Time: 120 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Understand event loop behavior at a practical level.
- Use promises and async/await with proper error handling.
- Run independent tasks in parallel with Promise.all.
- Identify and avoid common async bugs.

## Deep Dive
### Event Loop in Practice
Node does not wait for I/O operations to finish before moving to other work. This is why a backend can handle many requests concurrently even with one main JavaScript thread.

### From Callback to Promise
Callbacks work but quickly lead to nested and harder-to-maintain code. Promises model success/failure states and are composable.

### Async/Await Discipline
async/await improves readability but does not make code synchronous in reality. Always wrap awaited calls in try/catch at boundaries like route handlers and workers.

### Parallel vs Sequential
If tasks are independent, run them in parallel with Promise.all for better latency. If one depends on the previous result, keep sequential await.

## Worked Example
```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDashboardData() {
  try {
    const [user, notifications] = await Promise.all([
      fetchUser(),
      fetchNotifications()
    ]);
    return { user, notifications };
  } catch (err) {
    throw new Error(`dashboard load failed: ${err.message}`);
  }
}
```

## Common Pitfalls
- Forgetting return/await in async functions, causing undefined or unhandled promises.
- Using Promise.all when you actually need partial success behavior (Promise.allSettled may be better).
- Catching errors too early and hiding useful stack context.

## Debugging Checklist
- Add temporary timing logs around async blocks to find bottlenecks.
- Use process.on("unhandledRejection", ...) in local debugging.
- Reproduce failures with fixed test inputs and deterministic delays.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Build a profile endpoint that combines user, orders, and recommendations.
2. Fetch independent data sources in parallel.
3. Return partial diagnostics when one provider fails.

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
