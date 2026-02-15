# Node Runtime and Module System

    ## Goals
    - Understand Node process model, globals, CommonJS vs ESM, and module boundaries.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - Node runs JavaScript on V8 outside the browser.
- Useful globals: process, __dirname, __filename, Buffer.
- CommonJS uses require/module.exports; ESM uses import/export.
- Use small modules with clear responsibilities.

    ## Practice Tasks
    1. Print runtime info (node version, platform, cwd).
1. Create math module with add/subtract/multiply/divide.
1. Import it from app.js and log sample results.
1. Handle divide-by-zero safely.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
