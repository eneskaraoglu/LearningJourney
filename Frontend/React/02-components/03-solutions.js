// Components and Composition - Exercise Solutions

/*
Exercise 1: Card Component
*/
function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "8px" }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}


/*
Exercise 2: Profile Card
*/
function Profile({ name, role, bio }) {
  return (
    <Card title="Profile">
      <p>{name}</p>
      <p>{role}</p>
      <p>{bio}</p>
    </Card>
  );
}


/*
Exercise 3: Avatar List
*/
const users = [
  { id: 1, name: "Ava" },
  { id: 2, name: "Ben" },
  { id: 3, name: "Cara" }
];

function AvatarList() {
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <span>{u.name}</span>
        </li>
      ))}
    </ul>
  );
}


/*
Exercise 4: Button Variants
*/
function Button({ variant, children }) {
  const styles = {
    primary: { background: "#1d4ed8", color: "white" },
    secondary: { background: "#e5e7eb", color: "#111" }
  };

  return <button style={{ padding: "8px 12px", ...styles[variant] }}>{children}</button>;
}
