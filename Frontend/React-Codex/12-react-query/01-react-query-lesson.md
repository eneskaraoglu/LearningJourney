# Session 12: React Query

## Learning Objectives
By the end of this session, you will:
1. Use React Query to fetch and cache data
2. Handle loading and error states easily
3. Invalidate and refetch data

---

## 1. Setup

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}
```

---

## 2. Fetching Data

```jsx
import { useQuery } from "@tanstack/react-query";

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## Summary
1. React Query simplifies async data
2. Caching and refetching are built in
