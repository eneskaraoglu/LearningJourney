# JVM Memory And Performance

## Goals
- Understand heap, stack, and garbage collection behavior.
- Identify common memory and performance problems.
- Use basic profiling tools and metrics.

## Core Concepts
The JVM manages memory with a heap for objects and a stack per thread for call frames. Garbage collectors trade throughput for latency. The JIT compiler optimizes hot code paths. Memory leaks in Java are typically caused by lingering references, not manual allocation. Use tools like JFR or VisualVM to inspect allocations and CPU hotspots.

## Interview Focus
- Heap vs stack
- GC tradeoffs and pauses
- What a memory leak looks like in Java
- JIT and warm-up effects
