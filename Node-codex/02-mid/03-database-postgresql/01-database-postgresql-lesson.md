# PostgreSQL Integration with node-postgres

    ## Goals
    - Execute parameterized SQL queries and organize data access in repository functions.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - Use connection pools for efficiency.
- Always parameterize SQL to prevent injection.
- Map rows to domain objects.
- Keep SQL in repository/service layers.

    ## Practice Tasks
    1. Create pool config using DATABASE_URL env var.
1. Write createUser(name, email) with RETURNING *.
1. Write findUserByEmail(email).
1. Handle duplicate-email errors gracefully.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
