# Interfaces and Contracts in Dart

## Module Info
- Level: Intermediate
- Duration: 75 minutes
- Prerequisites: Inheritance

## Learning Outcomes
- Define contracts with abstract classes or interface-style design.
- Swap implementations without rewriting calling code.
- Improve testability through clear abstractions.

## Deep Dive
### Contract Thinking
- An interface defines what a component must do, not how it does it.

### Multiple Implementations
- Real projects often need memory, file, and API-backed variants of the same service contract.

### Testability
- Interfaces make mocking or fake implementations practical.

## Worked Example
```dart
abstract class TaskRepository {
  void save(String title);
  List<String> findAll();
}
```

## Common Pitfalls
- Creating abstractions before there is a real variation point.
- Putting too many unrelated responsibilities into one interface.
- Naming a class "manager" or "service" without defining a clear contract.

## Debugging Checklist
- Confirm the interface methods are cohesive.
- Verify callers depend on the abstraction, not a concrete implementation.
- Check whether a fake implementation can be written easily.

## Step-by-Step Practice Plan
1. Extract a repository or notifier contract.
2. Create two implementations.
3. Swap implementations without changing caller logic.

## Mini Project Task
Define a storage contract with in-memory and file-like implementations.

## Interview Q&A
- Q: Why use an interface in a small app?
- A: To keep boundaries clean where implementations are likely to change or need testing.

## Exit Criteria
- You can identify a useful abstraction point and keep the contract focused.
