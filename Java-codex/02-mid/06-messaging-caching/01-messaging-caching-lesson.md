# Messaging And Caching

## Goals
- Use async messaging to decouple services.
- Understand idempotency and retries.
- Apply caching safely with Spring Cache.

## Core Concepts
Messaging systems like Kafka and RabbitMQ enable async communication and buffering. Consumers must be idempotent to handle retries. The outbox pattern keeps DB updates and events consistent. Caching improves read performance but introduces invalidation complexity. Use `@Cacheable`, `@CacheEvict`, and measure hit rates.

## Interview Focus
- When to use messaging vs REST
- Idempotency and retry strategies
- Cache invalidation approaches
- Eventual consistency tradeoffs
