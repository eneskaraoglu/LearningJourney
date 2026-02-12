# Spring Boot Sample (Gradle)

A Gradle-based version of the Tasks API sample.

## Run
```bash
./gradlew bootRun
```

## Test
```bash
./gradlew test
```

## Testcontainers
```bash
./gradlew test --tests TaskPostgresContainerTest
```

## OpenAPI
Swagger UI: `http://localhost:8080/swagger-ui/index.html`
OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Postman
Import `postman/Tasks-API-Gradle.postman_collection.json`.

## Docker
```bash
docker compose up --build
```

## Docker + Postgres
```bash
docker compose -f docker-compose.postgres.yml up --build
```
