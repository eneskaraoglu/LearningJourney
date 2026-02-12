# Advanced Security

## Goals
- Implement OAuth2 and OIDC flows.
- Protect service-to-service communication.
- Manage secrets and reduce attack surface.

## Core Concepts
OAuth2 delegates authorization; OIDC adds identity. Use PKCE for public clients. Service-to-service calls should use mTLS or signed tokens. Rotate secrets and use a secrets manager rather than environment variables in plain text. Apply least privilege and threat modeling to high-risk endpoints.

## Interview Focus
- OAuth2 flows and PKCE
- JWT vs opaque tokens
- Secret management practices
- Defense-in-depth approach
