# Data Consistency In Distributed Systems

## Goals
- Apply patterns for cross-service consistency.
- Use sagas and outbox safely.
- Understand CAP and tradeoffs.

## Core Concepts
Distributed systems trade consistency for availability and partition tolerance. Sagas orchestrate or choreograph multi-step workflows. The outbox pattern ensures events are published reliably after DB commits. CQRS separates reads and writes to scale and isolate complexity.

## Interview Focus
- CAP theorem and real-world interpretation
- Saga patterns and compensations
- Eventual consistency tradeoffs
- Idempotency in distributed workflows
