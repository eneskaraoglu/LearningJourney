# Threads And Streams (Basics)

## Goals
- Understand the difference between threads and tasks.
- Use `ExecutorService` for simple concurrency.
- Build Stream pipelines for collection processing.

## Core Concepts
Creating threads directly is possible but usually replaced by executor pools. `ExecutorService` manages thread lifecycle and supports `Callable` for results. For data processing, Streams use a pipeline of `map`, `filter`, and `reduce`. Prefer sequential streams unless you measure a real benefit from parallel streams.

## Interview Focus
- `Runnable` vs `Callable`
- Why executors are preferred over raw threads
- Common stream operations and terminal operations
- When parallel streams hurt performance
