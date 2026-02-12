# Solutions (Short)

1. Reserve inventory, charge payment, confirm, or compensate in reverse order.
2. Cancel shipment and refund or rebook with another carrier.
3. Write event to outbox table in same transaction; publish asynchronously.
4. Use a denormalized read store updated by events.
5. Track event IDs and ignore duplicates.
6. Prefer availability and partition tolerance with eventual consistency.
