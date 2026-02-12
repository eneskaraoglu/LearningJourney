# Performance Tuning

## Goals
- Analyze latency and throughput bottlenecks.
- Optimize database and JVM settings.
- Balance throughput with tail latency.

## Core Concepts
Start with measurements and a clear performance budget. Use profiling to find hotspots and slow queries. Tuning often comes from better indexing, reducing N+1 queries, batching, and controlling concurrency. Tail latency matters for user experience; optimize p95 and p99, not just averages.

## Interview Focus
- End-to-end performance workflow
- DB indexing and query plan checks
- Connection pool sizing
- JVM tuning basics
