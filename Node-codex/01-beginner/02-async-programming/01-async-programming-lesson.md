# Asynchronous Programming in Node.js

    ## Goals
    - Use callbacks, promises, and async/await correctly with robust error handling.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - Node uses an event loop for non-blocking I/O.
- Callbacks are legacy but still seen in ecosystem APIs.
- Promises improve composition and readability.
- async/await makes sequential async flows easier to reason about.

    ## Practice Tasks
    1. Convert callback-based wait function into promise-based version.
1. Create async function that fetches user and orders with simulated delay.
1. Use try/catch to handle failures.
1. Run two independent async tasks in parallel with Promise.all.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
