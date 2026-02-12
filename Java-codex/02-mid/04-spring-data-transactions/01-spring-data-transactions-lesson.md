# Spring Data Transactions

## Goals
- Use transaction boundaries correctly.
- Understand propagation and isolation levels.
- Prevent common data consistency bugs.

## Core Concepts
`@Transactional` defines a unit of work. Propagation controls whether a method joins or starts a new transaction. Isolation levels define visibility of concurrent changes. Use optimistic locking for high concurrency and pessimistic locking for critical updates. Avoid long transactions that hold locks too long.

## Interview Focus
- Propagation types and use cases
- Isolation levels and anomalies
- Optimistic vs pessimistic locking
- Where to place transaction boundaries
