# Spring Boot Sample (Tasks API)

A minimal Spring Boot project that demonstrates REST + JPA + validation + tests.

## Features
- CRUD endpoints at `/api/tasks`
- H2 in-memory database
- DTO-based API responses
- Validation and global error handling
- Example controller and repository tests

## Run
```bash
# From this folder
mvn spring-boot:run
```

## Test
```bash
mvn test
```

## Testcontainers
Run container-based tests with:
```bash
mvn -Dtest=TaskPostgresContainerTest test
```

## OpenAPI
Swagger UI: `http://localhost:8080/swagger-ui/index.html`
OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Postman
Import `postman/Tasks-API.postman_collection.json`.

## Docker
```bash
docker compose up --build
```

## Docker + Postgres
```bash
docker compose -f docker-compose.postgres.yml up --build
```
