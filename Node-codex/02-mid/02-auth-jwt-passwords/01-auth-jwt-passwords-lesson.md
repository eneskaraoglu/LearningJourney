# Authentication: Password Hashing and JWT

## Module Info
- Level: Mid
- Recommended Session Time: 150 minutes
- Prerequisite: Complete the previous module in sequence.

## Learning Outcomes
- Implement secure signup and login flows.
- Hash passwords with bcrypt and verify safely.
- Issue and validate JWT tokens with expiration.
- Protect routes with authentication middleware.

## Deep Dive
### Password Security
Always hash passwords with a strong one-way function like bcrypt. Never store plain-text or reversible encrypted passwords.

### Token Structure
JWT includes header, payload, and signature. Signed tokens prove integrity but are not encrypted, so never store sensitive data inside payload.

### Auth Middleware Pattern
Read Authorization header, validate Bearer token, attach user context to req.user, and reject invalid/expired tokens with 401.

### Refresh Strategy
Short-lived access tokens plus refresh tokens reduce blast radius if token leaks. Store refresh tokens safely and rotate them.

## Worked Example
```js
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'missing token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'invalid token' });
  }
}
```

## Common Pitfalls
- Hard-coding secrets in source code instead of env variables.
- Using long expiration tokens without refresh strategy.
- Leaking whether email exists on login in ways that aid user enumeration.

## Debugging Checklist
- Decode token payload locally to inspect exp/sub claims.
- Verify server time correctness when expiry behavior looks wrong.
- Test invalid signatures, expired tokens, and missing headers.

## Step-by-Step Practice Plan
1. Re-type the worked example instead of copy-pasting it.
2. Add one intentional bug and debug it using logs and assertions.
3. Solve `02-exercises.js` fully without opening `03-solutions.js`.
4. Compare with solution and note one refactor you would keep.

## Mini Project Task
1. Build auth endpoints: register, login, me.
2. Protect /me route with middleware and return current user profile.
3. Add basic role claim (user/admin) and one role-protected route.

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
