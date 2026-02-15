# HTTP Fundamentals and Express Basics

    ## Goals
    - Build routes, parse JSON, and return proper HTTP status codes.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - HTTP uses method + path + headers + body.
- Express route handlers receive req and res.
- Use middleware for parsing and cross-cutting logic.
- Choose correct status codes: 200, 201, 400, 404, 500.

    ## Practice Tasks
    1. Create Express app with /health route.
1. Add in-memory tasks array.
1. Implement GET /tasks and POST /tasks with validation.
1. Return 400 when title is missing.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
