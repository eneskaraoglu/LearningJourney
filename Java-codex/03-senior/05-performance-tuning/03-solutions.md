# Solutions (Short)

1. Measure, profile, inspect DB, then optimize and retest.
2. Index columns used in WHERE, JOIN, and ORDER BY clauses.
3. Pool size should align with DB limits and thread count.
4. Use fetch joins or batch fetching.
5. Async helps when tasks are I/O bound and independent.
6. p95 reflects real user experience more than averages.
