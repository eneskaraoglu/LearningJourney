# Session 6: Data Fetching and Forms

## Learning Objectives
By the end of this session, you will:
1. Fetch data with useEffect
2. Handle loading and error states
3. Build controlled forms
4. Validate simple form input

---

## 1. Fetching Data

```jsx
import { useEffect, useState } from "react";

function Users() {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

## 2. Controlled Forms

```jsx
function Signup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 3. Basic Validation

```jsx
const isValid = email.includes("@");
```

---

## Summary
1. Fetch in useEffect and handle states
2. Use controlled inputs for forms
3. Validate before submitting
