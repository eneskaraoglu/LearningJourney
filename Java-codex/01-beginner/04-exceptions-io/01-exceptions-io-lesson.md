# Exceptions And I/O

## Goals
- Use checked and unchecked exceptions correctly.
- Manage resources safely with try-with-resources.
- Read and write files using `java.nio`.

## Core Concepts
Checked exceptions must be declared or handled, while unchecked exceptions typically represent programming errors. Use custom exceptions to clarify domain failures. For I/O, prefer `java.nio.file.Files` and `Path`. Use try-with-resources to close files and streams reliably. Log exceptions with context instead of swallowing them.

## Interview Focus
- Checked vs unchecked exception tradeoffs
- When to create custom exceptions
- Why try-with-resources is safer than `finally`
- Common pitfalls: swallowed exceptions, empty `catch` blocks
