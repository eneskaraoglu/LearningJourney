# Collections And Generics

## Goals
- Choose the right collection type for common problems.
- Use generics to enforce type safety.
- Explain time complexity for common operations.

## Core Concepts
Use `List` for ordered data, `Set` for uniqueness, and `Map` for key-value access. `ArrayList` offers fast indexed access; `LinkedList` favors frequent inserts at known positions but is rarely needed. `HashMap` and `HashSet` offer average O(1) lookup but depend on good `hashCode` implementations. Generics remove casting and make APIs safer. Wildcards (`? extends`, `? super`) help with covariance and contravariance.

## Interview Focus
- Big-O for common collection operations
- `HashMap` collisions and why `hashCode` matters
- `List` vs `Set` usage patterns
- When to use `Map` over a list of pairs
