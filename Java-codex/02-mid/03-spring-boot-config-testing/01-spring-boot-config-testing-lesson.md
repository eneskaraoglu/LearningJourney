# Spring Boot Config And Testing

## Goals
- Use profiles and configuration properties cleanly.
- Test controllers, services, and repositories effectively.
- Mock external dependencies and keep tests fast.

## Core Concepts
Use `@ConfigurationProperties` to map config to strongly typed objects. Profiles separate environment-specific settings. For testing, use `@WebMvcTest` for controllers, `@DataJpaTest` for repositories, and `@SpringBootTest` for full context. Mock dependencies with `@MockBean`. Keep unit tests isolated and integration tests intentional.

## Interview Focus
- When to use slice tests vs full context
- How to override configuration in tests
- Tradeoffs of `@SpringBootTest`
- Testing external integrations safely
