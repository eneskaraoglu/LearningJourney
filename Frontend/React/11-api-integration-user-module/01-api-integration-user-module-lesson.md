# Session 11: API Integration and User Module

## Learning Objectives
By the end of this session, you will:
1. Fetch user data from an API
2. Display list and detail views
3. Handle loading and error states

---

## 1. Fetch Users

```jsx
import { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## 2. User Detail

```jsx
function UserDetail({ user }) {
  if (!user) return <div>Select a user</div>;
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## Summary
1. Separate list and detail components
2. Handle loading and error states
