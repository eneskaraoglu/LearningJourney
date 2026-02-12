# Solutions (Short)

1. Leaks keep references; high allocation just creates many temporary objects.
2. Look for pause times, allocation rate, and GC frequency.
3. Use profiling with timers, sampling, and JFR to find hotspots.
4. Unbounded caches and static collections are common retention risks.
5. JIT needs time to optimize, so early results are misleading.
6. Check thread dumps, profiler, and DB or external calls.
