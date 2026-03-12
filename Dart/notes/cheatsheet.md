# Dart Cheatsheet

## Variables
- `var name = 'Ada';`
- `String city = 'Istanbul';`
- `final createdAt = DateTime.now();`
- `const taxRate = 0.18;`

## Functions
- Use named parameters for clarity:
```dart
double total({required double price, required int qty, double discount = 0}) {
  return (price * qty) - discount;
}
```

## Collections
- `List<T>` for ordered items.
- `Set<T>` for unique items.
- `Map<K, V>` for keyed lookup.

## Null Safety
- `String? nickname;`
- `nickname ?? 'Guest'`
- `user?.email`

## Async
- `Future<T>` for one later result.
- `Stream<T>` for many results over time.

## OOP
- Use classes for stable data shapes.
- Use interfaces for contracts.
- Use mixins for focused shared behavior.

## Design Reminders
- Prefer `final` by default.
- Keep parsing at the boundaries.
- Replace raw maps with classes when the shape stabilizes.
- Use composition before inheritance when reuse is the only goal.
