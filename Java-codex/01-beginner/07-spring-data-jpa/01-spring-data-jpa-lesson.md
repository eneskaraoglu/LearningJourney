# Spring Data JPA Basics

## Goals
- Map entities and repositories.
- Use derived queries and pagination.
- Understand lazy loading and transaction boundaries.

## Core Concepts
Entities are mapped with `@Entity` and `@Id`. Repositories extend `JpaRepository` to provide CRUD operations. Derived query methods like `findByEmail` are generated automatically. Use `@Transactional` to define a unit of work. Be careful with lazy loading outside transactions and avoid N+1 query issues using fetch joins.

## Interview Focus
- What `@Transactional` does
- Lazy vs eager loading
- N+1 query problem
- Entity identity and `equals`
