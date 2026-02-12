# Solutions (Short)

1. Use `@OneToMany` and `@ManyToOne` with mappedBy and foreign key.
2. Add methods on `JpaRepository` using naming conventions.
3. Use `Pageable` and `Page<T>` in controller and service.
4. Access lazy relations inside a transaction or use fetch join.
5. Mark service method with `@Transactional` to keep changes atomic.
6. Use `@Query("select o from Order o where o.createdAt between :a and :b")`.
