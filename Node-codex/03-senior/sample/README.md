# Senior Sample API

## What This Covers
- Structured logging + correlation IDs
- In-memory metrics and `/metrics` endpoint
- Socket.IO room-based events

## Run
1. `npm install`
2. Copy `.env.example` to `.env` (optional)
3. `npm run dev`

HTTP: `http://localhost:3002`
WebSocket: same host/port (`/socket.io`)

## Endpoints
- `GET /health`
- `POST /events/task-updated`
- `GET /metrics`
