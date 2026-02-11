import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

/*
  REACT QUERY SOLUTIONS

  Complete implementations demonstrating React Query patterns.
*/

// ============================================================================
// Exercise 1: Basic useQuery
// ============================================================================

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      return response.json()
    },
  })

  if (isLoading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div className="user-list">
      <h3>Users</h3>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// Exercise 2: Query with Parameters
// ============================================================================

export function UserDetail({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      )
      if (!response.ok) throw new Error('Failed to fetch user')
      return response.json()
    },
  })

  if (isLoading) return <div className="loading">Loading user...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div className="user-detail">
      <h3>{data.name}</h3>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Website:</strong> {data.website}</p>
      <p><strong>Company:</strong> {data.company?.name}</p>
    </div>
  )
}

// ============================================================================
// Exercise 3: Dependent Queries
// ============================================================================

export function UserPosts({ userId }) {
  // First query: Fetch user
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      )
      if (!response.ok) throw new Error('Failed to fetch user')
      return response.json()
    },
  })

  // Second query: Fetch posts (only after user is loaded)
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      )
      if (!response.ok) throw new Error('Failed to fetch posts')
      return response.json()
    },
    enabled: !!user, // Only fetch posts after user is loaded
  })

  if (userLoading) return <div className="loading">Loading user...</div>
  if (userError) return <div className="error">Error: {userError.message}</div>

  return (
    <div className="user-posts">
      <h3>{user.name}'s Posts</h3>

      {postsLoading && <div className="loading">Loading posts...</div>}
      {postsError && <div className="error">Error: {postsError.message}</div>}

      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ============================================================================
// Exercise 4: useMutation for POST
// ============================================================================

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })
      if (!response.ok) throw new Error('Failed to create post')
      return response.json()
    },
    onSuccess: (data) => {
      setSuccessMessage(`Post created with ID: ${data.id}`)
      setTitle('')
      setBody('')
      setTimeout(() => setSuccessMessage(''), 3000)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ title, body, userId: 1 })
  }

  return (
    <div className="create-post">
      <h3>Create New Post</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post content"
          rows="5"
          required
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {mutation.isError && (
        <div className="error">Error: {mutation.error.message}</div>
      )}

      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  )
}

// ============================================================================
// Exercise 5: useMutation for DELETE
// ============================================================================

export function PostList() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10'
      )
      if (!response.ok) throw new Error('Failed to fetch posts')
      return response.json()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { method: 'DELETE' }
      )
      if (!response.ok) throw new Error('Failed to delete post')
      return postId
    },
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  if (isLoading) return <div className="loading">Loading posts...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div className="post-list">
      <h3>Posts</h3>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <div className="post-content">
              <strong>{post.title}</strong>
              <p>{post.body.substring(0, 100)}...</p>
            </div>
            <button
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isLoading}
              className="delete-btn"
            >
              {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// Exercise 6: Optimistic Updates
// ============================================================================

export function OptimisticTodoList() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      )
      if (!response.ok) throw new Error('Failed to fetch todos')
      return response.json()
    },
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !completed }),
        }
      )
      if (!response.ok) throw new Error('Failed to update todo')
      return response.json()
    },
    onMutate: async ({ id, completed }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // Snapshot previous value
      const previousTodos = queryClient.getQueryData(['todos'])

      // Optimistically update
      queryClient.setQueryData(['todos'], (old) =>
        old.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      )

      return { previousTodos }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['todos'], context.previousTodos)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (isLoading) return <div className="loading">Loading todos...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div className="todo-list">
      <h3>Todos (Optimistic Updates)</h3>
      <ul>
        {data.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                toggleMutation.mutate({ id: todo.id, completed: todo.completed })
              }
            />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// Exercise 7: Infinite Query (Pagination)
// ============================================================================

export function InfinitePosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['infinite-posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
      )
      if (!response.ok) throw new Error('Failed to fetch posts')
      return response.json()
    },
    getNextPageParam: (lastPage, allPages) => {
      // Return next page number or undefined if no more pages
      return lastPage.length === 10 ? allPages.length + 1 : undefined
    },
  })

  if (isLoading) return <div className="loading">Loading posts...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div className="infinite-posts">
      <h3>Infinite Posts</h3>

      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}

      {!hasNextPage && <p className="end-message">No more posts to load</p>}
    </div>
  )
}

// ============================================================================
// Exercise 8: Query Invalidation & Refetching
// ============================================================================

export function UserProfile({ userId }) {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      )
      if (!response.ok) throw new Error('Failed to fetch user')
      return response.json()
    },
    onSuccess: (data) => {
      setFormData({ name: data.name, email: data.email, phone: data.phone })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      )
      if (!response.ok) throw new Error('Failed to update user')
      return response.json()
    },
    onSuccess: () => {
      // Invalidate user query to refetch
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
      setIsEditing(false)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateMutation.mutate(formData)
  }

  if (isLoading) return <div className="loading">Loading profile...</div>
  if (error) return <div className="error">Error: {error.message}</div>

  return (
    <div className="user-profile">
      <h3>User Profile</h3>

      {!isEditing ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-edit">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone"
            required
          />
          <div className="button-group">
            <button type="submit" disabled={updateMutation.isLoading}>
              {updateMutation.isLoading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {updateMutation.isError && (
        <div className="error">Error: {updateMutation.error.message}</div>
      )}

      {updateMutation.isSuccess && (
        <div className="success">Profile updated successfully!</div>
      )}
    </div>
  )
}

// ============================================================================
// Main App Component
// ============================================================================

export default function App() {
  const [activeExercise, setActiveExercise] = useState(1)

  const exercises = [
    { number: 1, title: 'Basic useQuery', Component: UserList },
    { number: 2, title: 'Query with Params', Component: () => <UserDetail userId={1} /> },
    { number: 3, title: 'Dependent Queries', Component: () => <UserPosts userId={1} /> },
    { number: 4, title: 'Create Post', Component: CreatePost },
    { number: 5, title: 'Delete Posts', Component: PostList },
    { number: 6, title: 'Optimistic Updates', Component: OptimisticTodoList },
    { number: 7, title: 'Infinite Query', Component: InfinitePosts },
    { number: 8, title: 'Query Invalidation', Component: () => <UserProfile userId={1} /> },
  ]

  const currentExercise = exercises.find((ex) => ex.number === activeExercise)

  return (
    <div className="app">
      <header>
        <h1>React Query Solutions</h1>
        <p>Complete implementations of React Query patterns</p>
      </header>

      <nav className="exercise-nav">
        {exercises.map((ex) => (
          <button
            key={ex.number}
            className={activeExercise === ex.number ? 'active' : ''}
            onClick={() => setActiveExercise(ex.number)}
          >
            {ex.number}. {ex.title}
          </button>
        ))}
      </nav>

      <main>
        <div className="exercise-container">
          <h2>
            Exercise {currentExercise.number}: {currentExercise.title}
          </h2>
          <div className="exercise-demo">
            <currentExercise.Component />
          </div>
        </div>
      </main>

      <footer>
        <p>React Query - Powerful server state management</p>
      </footer>
    </div>
  )
}
