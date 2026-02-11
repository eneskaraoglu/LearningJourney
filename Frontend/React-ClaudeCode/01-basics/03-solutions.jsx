// React Basics - Solutions

// Exercise 1: Create a simple component
function Header() {
  return <h1>My First React App</h1>;
}

// Exercise 2: Component with props
function UserCard(props) {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <p>Email: {props.email}</p>
    </div>
  );
}

// Exercise 3: Destructured props
function Product({ name, price, inStock }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}

// Exercise 4: Conditional rendering
function LoginStatus(props) {
  return (
    <div>
      {props.isLoggedIn ? (
        <h2>Welcome back!</h2>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}

// Alternative solution using &&
function LoginStatusAlt(props) {
  return (
    <div>
      {props.isLoggedIn && <h2>Welcome back!</h2>}
      {!props.isLoggedIn && <h2>Please log in</h2>}
    </div>
  );
}

// Exercise 5: List rendering
function TodoList(props) {
  return (
    <ul>
      {props.todos.map((todo) => (
        <li key={todo.id}>
          {todo.text} {todo.completed && '(completed)'}
        </li>
      ))}
    </ul>
  );
}

// Exercise 6: Event handling
function Counter() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

// Alternative: inline arrow function
function CounterAlt() {
  return (
    <div>
      <button onClick={() => console.log('Button clicked!')}>
        Click me
      </button>
    </div>
  );
}

// Exercise 7: Multiple props types
function BlogPost(props) {
  // Early return if not published
  if (!props.isPublished) {
    return null;
  }

  return (
    <article>
      <h2>{props.title}</h2>
      <p>By {props.author} | {props.date}</p>
      <p>Tags: {props.tags.join(', ')}</p>
    </article>
  );
}

// Alternative with destructuring
function BlogPostAlt({ title, author, date, tags, isPublished }) {
  if (!isPublished) return null;

  return (
    <article>
      <h2>{title}</h2>
      <p>By {author} | {date}</p>
      <p>Tags: {tags.join(', ')}</p>
    </article>
  );
}

// Exercise 8: Nested components
function ProfileCard({ name, bio, skills }) {
  return (
    <div className="profile-card">
      <Header />
      <h2>{name}</h2>
      <p>{bio}</p>
      <h3>Skills:</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

// Note: Using index as key is acceptable here since the skills list
// is static and won't be reordered. For dynamic lists, use unique IDs.

// Test data
const sampleTodos = [
  { id: 1, text: "Learn React basics", completed: true },
  { id: 2, text: "Build a project", completed: false },
  { id: 3, text: "Master hooks", completed: false }
];

const sampleSkills = ["JavaScript", "React", "CSS", "Git"];

const sampleBlogPost = {
  title: "Getting Started with React",
  author: "Jane Doe",
  date: "2024-01-15",
  tags: ["react", "javascript", "tutorial"],
  isPublished: true
};

// Example usage (for testing):
/*
function App() {
  return (
    <div>
      <Header />
      <UserCard name="John Doe" email="john@example.com" />
      <Product name="Laptop" price={999} inStock={true} />
      <LoginStatus isLoggedIn={true} />
      <TodoList todos={sampleTodos} />
      <Counter />
      <BlogPost {...sampleBlogPost} />
      <ProfileCard
        name="Jane Smith"
        bio="Full-stack developer passionate about React"
        skills={sampleSkills}
      />
    </div>
  );
}
*/

export {
  Header,
  UserCard,
  Product,
  LoginStatus,
  LoginStatusAlt,
  TodoList,
  Counter,
  CounterAlt,
  BlogPost,
  BlogPostAlt,
  ProfileCard
};
