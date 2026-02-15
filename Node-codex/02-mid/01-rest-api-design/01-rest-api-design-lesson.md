# REST API Design and Resource Modeling

    ## Goals
    - Design predictable APIs with filters, pagination, and consistent responses.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - Use nouns for resources: /users, /orders.
- Support pagination and filtering early.
- Return stable JSON shapes.
- Separate transport concerns from business logic.

    ## Practice Tasks
    1. Implement GET /products with page and limit query params.
1. Add category filter.
1. Implement GET /products/:id with 404 handling.
1. Use helper function for pagination metadata.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
