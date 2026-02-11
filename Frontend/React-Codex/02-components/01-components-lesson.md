# Session 2: Components and Composition

## Learning Objectives
By the end of this session, you will:
1. Build reusable components
2. Use props and children effectively
3. Compose components into layouts
4. Apply basic styling

---

## 1. Reusable Components

```jsx
function Badge({ label, color }) {
  return <span style={{ color }}>{label}</span>;
}
```

---

## 2. Composition

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
```

---

## 3. Children

```jsx
<Card title="Profile">
  <p>Content inside the card</p>
</Card>
```

---

## 4. Basic Styling

```jsx
const styles = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px"
};

<div style={styles}>Styled box</div>
```

---

## Summary
1. Components should be small and reusable
2. Composition lets you build UIs from smaller pieces
3. Children are perfect for flexible layouts
