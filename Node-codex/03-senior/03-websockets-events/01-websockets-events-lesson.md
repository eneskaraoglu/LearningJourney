# Real-time Communication with WebSockets

## Module Info
- Level: Senior
- Recommended Session Time: 120-150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Build real-time features using Socket.IO event patterns.
- Scope events with rooms/channels.
- Validate event payloads and handle disconnect flows.
- Design backpressure-aware real-time delivery behavior.

## Deep Dive
### When WebSockets Fit
Use WebSockets for collaborative editing, dashboards, notifications, and any low-latency bi-directional updates. Avoid them for simple request/response APIs that do not need persistent connections.

### Room-Based Broadcasting
Rooms let you target only interested clients, reducing network and client processing overhead.

### Payload Validation
Validate event payloads the same way you validate HTTP inputs. Reject malformed data early to protect server state.

### Connection Lifecycle
Handle connect, reconnect, and disconnect carefully. Track active clients and clean room-related resources when needed.

## Worked Example
```js
io.on('connection', (socket) => {
  socket.on('join-project', ({ projectId }) => {
    if (!projectId) return socket.emit('error-message', { message: 'projectId required' });
    socket.join(`project:${projectId}`);
  });

  socket.on('task-updated', (payload) => {
    if (!payload?.projectId || !payload?.taskId) return;
    io.to(`project:${payload.projectId}`).emit('task-updated', payload);
  });
});
```

## Common Pitfalls
- Broadcasting all events globally instead of per room.
- Trusting client payload blindly.
- Not handling reconnect logic in frontend consumers.

## Debugging Checklist
- Log socket.id with join/leave events.
- Use a test client script to emit invalid and valid payloads.
- Track event rates to detect noisy clients.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Build collaborative board updates by project room.
2. Emit task create/update/delete events.
3. Add basic server-side payload schema checks.

## Interview Q&A
### Q1: What problem does this module solve in real backend systems?
It improves reliability and maintainability by applying focused patterns instead of ad-hoc code changes.

### Q2: How do you test this area effectively?
Use unit tests for core logic and targeted integration tests for boundary behavior and error handling.

### Q3: What tradeoff should you be ready to explain?
Be explicit about complexity vs scalability. Prefer the simplest design that still satisfies reliability and growth requirements.

## Exit Criteria
- You can explain this module without reading notes.
- You can implement the core pattern from memory.
- You can describe one production risk and mitigation strategy.
