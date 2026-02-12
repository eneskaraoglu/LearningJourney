# React Query

## What is React Query?

React Query (TanStack Query) is a powerful library for managing server state in React applications. It provides caching, synchronization, and updates for server data.

### Why React Query?

- Automatic caching and cache invalidation
- Background refetching
- Request deduplication
- Automatic retries
- Optimistic updates
- Pagination and infinite scrolling support
- Less boilerplate than manual fetch

### Installation

```bash
npm install @tanstack/react-query
```

## Basic Setup

### Query Client Setup

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

## useQuery Hook

Fetch and cache data automatically.

### Basic Query

```jsx
import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Query Keys

Query keys uniquely identify queries for caching:

```jsx
// Simple key
useQuery({ queryKey: ['users'], queryFn: fetchUsers });

// Key with parameters
useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId)
});

// Complex key
useQuery({
  queryKey: ['users', { status: 'active', page: 1 }],
  queryFn: () => fetchUsers({ status: 'active', page: 1 })
});
```

### Query Options

```jsx
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5000,           // Data fresh for 5 seconds
  cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
  refetchOnWindowFocus: true, // Refetch when window regains focus
  refetchOnReconnect: true,   // Refetch on network reconnect
  retry: 3,                   // Retry failed requests 3 times
  enabled: isLoggedIn         // Conditionally enable query
});
```

## useMutation Hook

Perform create, update, delete operations.

### Basic Mutation

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name: 'John', email: 'john@example.com' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {mutation.isLoading && <p>Adding user...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>User added!</p>}
      <button type="submit">Add User</button>
    </form>
  );
}
```

### Update Mutation

```jsx
function UpdateUser({ userId }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updates) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    }
  });

  return (
    <button onClick={() => updateMutation.mutate({ name: 'Updated Name' })}>
      Update
    </button>
  );
}
```

### Delete Mutation

```jsx
function DeleteUser({ userId }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return (
    <button onClick={() => deleteMutation.mutate()}>
      {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

## Cache Management

### Invalidating Queries

```jsx
const queryClient = useQueryClient();

// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate all queries starting with key
queryClient.invalidateQueries({ queryKey: ['users'], exact: false });

// Invalidate multiple queries
queryClient.invalidateQueries({ queryKey: ['users'] });
queryClient.invalidateQueries({ queryKey: ['posts'] });
```

### Updating Cache Directly

```jsx
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: (newUser) => {
    // Update cache directly without refetch
    queryClient.setQueryData(['users'], (old) => [...old, newUser]);
  }
});
```

### Optimistic Updates

```jsx
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (updatedUser) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['users'] });

    // Snapshot previous value
    const previousUsers = queryClient.getQueryData(['users']);

    // Optimistically update
    queryClient.setQueryData(['users'], (old) =>
      old.map(user => user.id === updatedUser.id ? updatedUser : user)
    );

    // Return context with snapshot
    return { previousUsers };
  },
  onError: (err, updatedUser, context) => {
    // Rollback on error
    queryClient.setQueryData(['users'], context.previousUsers);
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
});
```

## Advanced Patterns

### Paginated Queries

```jsx
function PaginatedUsers() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true // Keep old data while fetching new page
  });

  return (
    <div>
      <UserList users={data?.users} />
      <button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage(old => old + 1)}
        disabled={!data?.hasMore}
      >
        Next
      </button>
    </div>
  );
}
```

### Infinite Queries

```jsx
import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteUsers() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    }
  });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  );
}
```

### Dependent Queries

```jsx
function UserPosts({ userId }) {
  // First query
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });

  // Second query depends on first
  const postsQuery = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userQuery.data // Only run when user data is available
  });

  if (userQuery.isLoading) return <div>Loading user...</div>;
  if (postsQuery.isLoading) return <div>Loading posts...</div>;

  return (
    <div>
      <h2>{userQuery.data.name}'s Posts</h2>
      <PostList posts={postsQuery.data} />
    </div>
  );
}
```

### Parallel Queries

```jsx
function Dashboard() {
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const commentsQuery = useQuery({ queryKey: ['comments'], queryFn: fetchComments });

  if (usersQuery.isLoading || postsQuery.isLoading || commentsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Stats
        users={usersQuery.data}
        posts={postsQuery.data}
        comments={commentsQuery.data}
      />
    </div>
  );
}
```

## DevTools

```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Best Practices

1. **Use query keys consistently** - Define them in constants
2. **Handle loading and error states** - Provide good UX
3. **Set appropriate cache times** - Balance freshness and performance
4. **Invalidate carefully** - Don't over-invalidate
5. **Use optimistic updates** - For better perceived performance
6. **Structure query keys hierarchically** - ['users', userId, 'posts']
7. **Enable DevTools in development** - Debug cache easily

## Summary

- **React Query** simplifies server state management
- **useQuery** for fetching data with automatic caching
- **useMutation** for create/update/delete operations
- **Cache invalidation** keeps data fresh
- **Optimistic updates** improve UX
- **Advanced patterns**: pagination, infinite scroll, dependent queries
- **DevTools** help debug and understand cache behavior

## Next Steps

Module 13 introduces Zustand for client state management and Error Boundaries for error handling.

---

## Q&A

### 1) What problem does React Query solve?
**Answer:** It manages server state lifecycle: fetching, caching, syncing, and invalidation.

### 2) What is a query key?
**Answer:** A stable identifier React Query uses to cache and refetch specific data.

### 3) Why invalidate queries after mutations?
**Answer:** Invalidation ensures stale cached data is refreshed after updates.

### 4) What is optimistic UI?
**Answer:** Temporarily update UI before server confirmation to improve perceived speed.

### 5) How does React Query improve developer workflow?
**Answer:** It removes boilerplate around loading/error/caching patterns.
