# Solutions (Short)

1. Separate Catalog, Ordering, Payments, and Shipping contexts.
2. Order is an aggregate root; Inventory item is another.
3. Domain core with ports and adapters for DB and messaging.
4. Move logic into entities and value objects.
5. Emit `OrderPlaced` from the aggregate root.
6. Enforce invariants inside aggregates and value objects.
