// React Query - Exercise Solutions

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Users() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>
        {data.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}
