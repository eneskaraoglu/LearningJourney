// React Basics - Exercises
// Complete each exercise below

// Exercise 1: Create a simple component
// TODO: Create a component called "Header" that displays "My First React App" in an h1 tag
function Header() {
  // Your code here
}

// Exercise 2: Component with props
// TODO: Create a "UserCard" component that accepts name and email props
// Display them in a div with appropriate labels
function UserCard(props) {
  // Your code here
}

// Exercise 3: Destructured props
// TODO: Create a "Product" component that accepts {name, price, inStock} props
// Use destructuring in the function parameters
// Display the product name, price, and availability status
function Product(/* destructure props here */) {
  // Your code here
}

// Exercise 4: Conditional rendering
// TODO: Create a "LoginStatus" component that accepts isLoggedIn prop
// If logged in, show "Welcome back!"
// If not logged in, show "Please log in"
function LoginStatus(props) {
  // Your code here
}

// Exercise 5: List rendering
// TODO: Create a "TodoList" component that accepts a todos array prop
// Each todo has {id, text, completed} properties
// Render each todo in a list with its text
// Add "(completed)" next to completed todos
function TodoList(props) {
  // Your code here
}

// Exercise 6: Event handling
// TODO: Create a "Counter" component with a button
// For now, just add an onClick handler that logs "Button clicked!" to console
// (We'll add state in the next module to make it actually count)
function Counter() {
  // Your code here
}

// Exercise 7: Multiple props types
// TODO: Create a "BlogPost" component that accepts:
// - title (string)
// - author (string)
// - date (string)
// - tags (array of strings)
// - isPublished (boolean)
// Display all information appropriately, showing tags as a comma-separated list
// Only show the post if isPublished is true
function BlogPost(props) {
  // Your code here
}

// Exercise 8: Nested components
// TODO: Create a "ProfileCard" component that:
// - Accepts name, bio, and skills (array) props
// - Uses the Header component from Exercise 1 to show the name
// - Displays the bio in a paragraph
// - Renders skills as a list using map
function ProfileCard(props) {
  // Your code here
}

// Test data (uncomment to test your components)
/*
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
*/

export { Header, UserCard, Product, LoginStatus, TodoList, Counter, BlogPost, ProfileCard };
