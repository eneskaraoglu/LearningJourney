# Solutions (Short)

1. Use `SecurityFilterChain` with `authorizeHttpRequests` rules.
2. Validate credentials, then issue a signed JWT with claims.
3. Enable method security and add role checks in annotations.
4. Register `PasswordEncoder` as a bean.
5. Disable CSRF for stateless APIs, keep it for browser sessions.
6. Use `hasRole("ADMIN")` or `hasAuthority` rules.
