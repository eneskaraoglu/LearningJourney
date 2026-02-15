# File System and Path Operations

    ## Goals
    - Read and write files safely using fs/promises and path utilities.
    - Practice implementation patterns used in real Node.js projects.
    - Build confidence for interviews and project work.

    ## Core Concepts
    - Use path.join/resolve instead of manual string concatenation.
- Prefer fs/promises with async/await.
- Create folders recursively when needed.
- Validate input before file writes to avoid bad data.

    ## Practice Tasks
    1. Create data directory if missing.
1. Write a notes.txt file with three lines.
1. Read file and print number of lines and words.
1. Append a timestamped line to the file.

    ## Interview Focus
    - Explain tradeoffs of this module's approach versus simpler alternatives.
    - Describe typical failure modes and how to debug them.
    - Show how you would test or monitor this area in production.

    ## Quick Prompt
    Implement a mini feature that uses all concepts above, then refactor once for readability and once for reliability.
