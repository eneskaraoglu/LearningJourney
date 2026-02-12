# Spring Boot Basics

## Goals
- Explain dependency injection and Spring's application context.
- Build a REST API with controllers and services.
- Use configuration properties and profiles.

## Core Concepts
Spring Boot auto-configures common components and starts an embedded server. Use constructor injection with `@Service` and `@Repository` to keep classes testable. `@RestController` exposes HTTP endpoints with request mapping annotations. Use DTOs to avoid exposing entity internals. Externalize config in `application.yml` and switch profiles for local vs production settings.

## Interview Focus
- What `@SpringBootApplication` does
- Controller vs service vs repository responsibilities
- Why constructor injection is preferred
- How profile-specific configuration works
