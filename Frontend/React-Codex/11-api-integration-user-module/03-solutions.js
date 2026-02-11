// API Integration and User Module - Exercise Solutions

import { useEffect, useMemo, useState } from "react";

function UserDetail({ user }) {
  if (!user) return <div>Select a user</div>;
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}

function UsersApp() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  }, [users, query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users"
        />
        <ul>
          {filtered.map((u) => (
            <li key={u.id}>
              <button onClick={() => setSelected(u)}>{u.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <UserDetail user={selected} />
    </div>
  );
}
