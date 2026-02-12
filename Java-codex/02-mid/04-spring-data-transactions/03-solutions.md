# Solutions (Short)

1. Use for audit logs or outbox entries that must persist independently.
2. Wrap both debits and credits in a single `@Transactional` service.
3. Add `@Version` field and handle `OptimisticLockException`.
4. Use locking or version checks to avoid overwrites.
5. `READ_COMMITTED` allows non-repeatable reads; `REPEATABLE_READ` prevents them.
6. Use `flush` and `clear` periodically in batch loops.
