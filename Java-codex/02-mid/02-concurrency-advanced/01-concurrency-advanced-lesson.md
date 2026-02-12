# Concurrency Advanced

## Goals
- Build safe concurrent code using modern utilities.
- Understand locks, atomics, and concurrent collections.
- Avoid deadlocks and race conditions.

## Core Concepts
Prefer immutable data and thread-safe collections like `ConcurrentHashMap`. Use `CompletableFuture` for async workflows. Locks such as `ReentrantLock` provide more control than `synchronized` but must be used carefully. Atomic classes provide lock-free operations for counters and flags. Design for clear ownership of shared state.

## Interview Focus
- `synchronized` vs explicit locks
- Atomicity and visibility
- Deadlock causes and prevention
- `CompletableFuture` composition patterns
