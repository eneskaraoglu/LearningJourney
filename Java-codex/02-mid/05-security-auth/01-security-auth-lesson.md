# Spring Security And Auth

## Goals
- Understand authentication and authorization in Spring.
- Configure a basic security filter chain.
- Implement JWT-based stateless auth.

## Core Concepts
Spring Security uses a filter chain to authenticate requests and enforce authorization rules. Authentication verifies identity; authorization checks permissions. Passwords should be hashed with a strong encoder. JWT is common for stateless APIs but requires careful token management and rotation. Protect endpoints with role-based rules and method security when needed.

## Interview Focus
- Authentication vs authorization
- CSRF and CORS differences
- Why passwords are hashed, not encrypted
- Where to validate JWTs in the filter chain
