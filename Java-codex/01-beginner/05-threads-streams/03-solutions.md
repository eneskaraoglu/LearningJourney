# Solutions (Short)

1. Use `Executors.newFixedThreadPool`, `invokeAll`, and `Future.get`.
2. Split range into chunks and submit `Callable<Integer>` tasks.
3. `users.stream().filter(...).sorted(...).collect(...)`.
4. `list.stream().map(String::toUpperCase).collect(joining(","))`.
5. `list.stream().reduce(Integer::max)`.
6. Parallel streams add coordination overhead that can dominate small work.
