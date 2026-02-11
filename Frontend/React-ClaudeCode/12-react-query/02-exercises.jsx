import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

/*
  REACT QUERY EXERCISES

  Learn to use React Query (@tanstack/react-query) for server state management.
  React Query simplifies data fetching, caching, and synchronization.
*/

// ============================================================================
// Exercise 1: Basic useQuery
// ============================================================================
/*
  Create a component that fetches a list of users using useQuery.

  Requirements:
  - Use useQuery to fetch data from https://jsonplaceholder.typicode.com/users
  - Display loading state
  - Display error state
  - Display the list of users

  Hint: useQuery takes a query key and a query function
*/

export function UserList() {
  // TODO: Implement useQuery to fetch users
}

// ============================================================================
// Exercise 2: Query with Parameters
// ============================================================================
/*
  Create a component that fetches a single user by ID using useQuery.

  Requirements:
  - Accept userId as prop
  - Fetch user from https://jsonplaceholder.typicode.com/users/${userId}
  - Include userId in query key
  - Handle loading and error states
  - Display user details
*/

export function UserDetail({ userId }) {
  // TODO: Implement useQuery with parameter
}

// ============================================================================
// Exercise 3: Dependent Queries
// ============================================================================
/*
  Create a component that fetches user posts only after user data is loaded.

  Requirements:
  - First fetch user data
  - Then fetch user's posts using the user ID
  - Use enabled option to wait for user data
  - Display user info and their posts

  URLs:
  - User: https://jsonplaceholder.typicode.com/users/${userId}
  - Posts: https://jsonplaceholder.typicode.com/posts?userId=${userId}
*/

export function UserPosts({ userId }) {
  // TODO: Implement dependent queries
}

// ============================================================================
// Exercise 4: useMutation for POST
// ============================================================================
/*
  Create a component with a form that creates a new post using useMutation.

  Requirements:
  - Use useMutation to POST to https://jsonplaceholder.typicode.com/posts
  - Handle loading state during mutation
  - Handle success and error states
  - Show success message after creation
  - Reset form on success

  Hint: useMutation returns { mutate, isLoading, isError, isSuccess }
*/

export function CreatePost() {
  // TODO: Implement useMutation for creating a post
}

// ============================================================================
// Exercise 5: useMutation for DELETE
// ============================================================================
/*
  Create a component that displays a list of posts with delete buttons.

  Requirements:
  - Fetch posts with useQuery
  - Use useMutation to delete posts
  - Invalidate queries after deletion to refetch
  - Show loading state on the delete button

  API: DELETE https://jsonplaceholder.typicode.com/posts/${id}

  Hint: Use queryClient.invalidateQueries() to refetch after delete
*/

export function PostList() {
  const queryClient = useQueryClient()

  // TODO: Implement delete functionality
}

// ============================================================================
// Exercise 6: Optimistic Updates
// ============================================================================
/*
  Create a todo list with optimistic updates.

  Requirements:
  - Fetch todos with useQuery
  - Toggle todo completion with useMutation
  - Update UI immediately (optimistic update)
  - Rollback on error
  - Use onMutate, onError, and onSettled callbacks

  API: https://jsonplaceholder.typicode.com/todos
*/

export function OptimisticTodoList() {
  // TODO: Implement optimistic updates
}

// ============================================================================
// Exercise 7: Infinite Query (Pagination)
// ============================================================================
/*
  Create a paginated list of posts using useInfiniteQuery.

  Requirements:
  - Use useInfiniteQuery to fetch posts
  - Implement "Load More" button
  - Handle loading states
  - Display all loaded pages

  API: https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10

  Hint: useInfiniteQuery needs getNextPageParam function
*/

export function InfinitePosts() {
  // TODO: Implement infinite query
}

// ============================================================================
// Exercise 8: Query Invalidation & Refetching
// ============================================================================
/*
  Create a user profile editor that refetches data after updates.

  Requirements:
  - Fetch user data with useQuery
  - Update user with useMutation
  - Invalidate user query after successful update
  - Show success message
  - Handle all loading/error states

  API:
  - GET: https://jsonplaceholder.typicode.com/users/${id}
  - PUT: https://jsonplaceholder.typicode.com/users/${id}
*/

export function UserProfile({ userId }) {
  const queryClient = useQueryClient()

  // TODO: Implement profile editing with query invalidation
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
        <h1>React Query Exercises</h1>
        <p>Master server state management with TanStack Query</p>
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
        <p>Complete each exercise to master React Query!</p>
      </footer>
    </div>
  )
}
