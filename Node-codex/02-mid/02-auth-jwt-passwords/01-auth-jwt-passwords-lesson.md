# Authentication: Password Hashing and JWT

    ## Goals
    - Implement signup/login flow with secure password storage and token verification.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - Never store plain-text passwords.
- Use bcrypt for hashing and verification.
- JWT carries identity claims and expiration.
- Protect routes with auth middleware.

    ## Practice Tasks
    1. Hash a sample password with bcrypt.
1. Verify correct and incorrect passwords.
1. Generate a JWT with user id claim.
1. Write function that validates token and returns payload or null.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
