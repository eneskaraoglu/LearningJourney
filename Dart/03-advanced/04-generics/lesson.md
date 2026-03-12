# Generics and Reusable Type-Safe APIs in Dart

## Module Info
- Level: Advanced
- Duration: 75 minutes
- Prerequisites: Interfaces and collections

## Learning Outcomes
- Write generic classes and functions.
- Reuse logic without giving up type safety.
- Know when generics improve a design and when they make it harder to read.

## Deep Dive
### Why Generics Matter
- Generics let one abstraction work across multiple types without falling back to `dynamic`.

### Practical Use Cases
- Repositories, wrappers, result types, caches, and collection helpers.

### Design Discipline
- Generic abstractions should still express a meaningful concept.

## Worked Example
```dart
class Result<T> {
  final T? data;
  final String? error;

  Result.success(this.data) : error = null;
  Result.failure(this.error) : data = null;
}
```

## Common Pitfalls
- Replacing clear specific code with over-abstracted generic code.
- Falling back to `dynamic` inside supposedly typed abstractions.
- Using generic names without clear meaning.

## Debugging Checklist
- Check the concrete type flowing into the generic abstraction.
- Verify nullability rules on generic fields.
- Simplify if the abstraction becomes harder to explain than the specific version.

## Step-by-Step Practice Plan
1. Convert a type-specific helper into a generic one.
2. Add a generic wrapper type.
3. Compare readability before and after abstraction.

## Mini Project Task
Create a generic repository or result wrapper for multiple domain models.

## Interview Q&A
- Q: Why not just use `dynamic`?
- A: Because generics preserve compile-time safety and clearer contracts.

## Exit Criteria
- You can use generics to remove duplication without hiding the design.
