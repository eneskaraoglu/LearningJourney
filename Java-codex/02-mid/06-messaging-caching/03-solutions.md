# Solutions (Short)

1. Producer emits events after commit; consumer processes asynchronously.
2. Store processed IDs and skip duplicates.
3. Use exponential backoff and a max retry count with dead-letter queue.
4. Cache by product ID and add TTL.
5. Evict or update cache on writes to avoid stale reads.
6. Write events to DB in same transaction and publish later.
