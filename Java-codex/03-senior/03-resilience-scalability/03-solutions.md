# Solutions (Short)

1. Use token bucket per API key with burst limits.
2. Separate thread pools for external calls and core logic.
3. Retry only idempotent operations with backoff.
4. SLIs: latency, error rate; SLOs: p95 < 300ms, error < 1%.
5. Scale horizontally, add caching, and pre-warm pools.
6. Disable non-critical features and return partial data.
