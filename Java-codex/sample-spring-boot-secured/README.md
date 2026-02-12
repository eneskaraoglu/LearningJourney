# Spring Boot Sample (Secured Tasks API)

A security-enabled variant of the Tasks API with JWT auth and role-based access.

## Features
- JWT login endpoint: `/auth/login`
- Protected API: `/api/tasks/**`
- Role-based access with `ROLE_USER` and `ROLE_ADMIN`
- In-memory user store for demo

## Run
```bash
# From this folder
mvn spring-boot:run
```

## Example
```bash
# Login
curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"password"}'

# Use token
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/tasks
```

## Testcontainers
```bash
mvn -Dtest=TaskPostgresContainerTest test
```

## OpenAPI
Swagger UI: `http://localhost:8080/swagger-ui/index.html`
OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Postman
Import `postman/Tasks-API-Secured.postman_collection.json`.

## Docker
```bash
docker compose up --build
```

## Docker + Postgres
```bash
docker compose -f docker-compose.postgres.yml up --build
```
