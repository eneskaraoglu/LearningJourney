# Mid Sample API

## What This Covers
- Layered structure: routes -> service -> repository
- JWT authentication and route protection
- Validation and consistent error mapping

## Run
1. `npm install`
2. Copy `.env.example` to `.env`
3. `npm run dev`

Server: `http://localhost:3001`

## Endpoints
- `POST /auth/register`
- `POST /auth/login`
- `GET /me`
- `GET /tasks`
- `POST /tasks`
