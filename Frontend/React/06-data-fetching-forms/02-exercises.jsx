// Data Fetching & Forms - Exercises

// Exercise 1: Basic Fetch
// TODO: Create a UserList component that fetches users from JSONPlaceholder API
// Display loading state, error state, and user list
// API: https://jsonplaceholder.typicode.com/users
function UserList() {
  // Your code here
}

// Exercise 2: Fetch with useEffect Dependencies
// TODO: Create a PostDetail component that accepts postId prop
// Fetch post data when postId changes
// API: https://jsonplaceholder.typicode.com/posts/{id}
function PostDetail({ postId }) {
  // Your code here
}

// Exercise 3: Controlled Form
// TODO: Create a ContactForm with name, email, and message fields
// All inputs should be controlled components
// Log form data on submit
function ContactForm() {
  // Your code here
}

// Exercise 4: Form Validation
// TODO: Create a SignupForm with email and password
// Validate: email format, password min 8 characters
// Show error messages below each field
// Disable submit button if form is invalid
function SignupForm() {
  // Your code here
}

// Exercise 5: Dynamic Form
// TODO: Create a TodoForm that adds items to a list
// Clear input after adding
// Show the list of todos below the form
function TodoForm() {
  // Your code here
}

// Exercise 6: Async Form Submission
// TODO: Create a LoginForm that simulates API call on submit
// Show loading state during submission
// Display success/error message after submission
// API (mock): POST to https://jsonplaceholder.typicode.com/posts
function LoginForm() {
  // Your code here
}

// Exercise 7: Search with Debounce
// TODO: Create a SearchBox that fetches results as user types
// Implement basic debouncing (wait 500ms after last keystroke)
// Display search results below input
// API: https://jsonplaceholder.typicode.com/users?name_like={query}
function SearchBox() {
  // Your code here
}

// Exercise 8: File Upload Preview
// TODO: Create an ImageUpload component
// Allow user to select an image file
// Show preview of the selected image
// Display file name and size
function ImageUpload() {
  // Your code here
}

// Exercise 9: Multi-Step Form
// TODO: Create a multi-step registration form
// Step 1: Personal info (name, email)
// Step 2: Address (street, city, zip)
// Step 3: Review and submit
// Include Next/Previous/Submit buttons
function MultiStepForm() {
  // Your code here
}

// Exercise 10: CRUD Operations
// TODO: Create a PostManager component with:
// - Fetch and display posts
// - Add new post (form)
// - Delete post (button on each post)
// - Edit post (inline or modal)
// Use JSONPlaceholder API for all operations
function PostManager() {
  // Your code here
}

export {
  UserList,
  PostDetail,
  ContactForm,
  SignupForm,
  TodoForm,
  LoginForm,
  SearchBox,
  ImageUpload,
  MultiStepForm,
  PostManager
};
