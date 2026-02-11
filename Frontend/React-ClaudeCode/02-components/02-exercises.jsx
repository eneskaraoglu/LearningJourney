// Components & Composition - Exercises

// Exercise 1: Children Prop
// TODO: Create a Card component that accepts children and a title prop
// Display the title in an h3 and render children below it
function Card({ title, children }) {
  // Your code here
}

// Exercise 2: Layout Component
// TODO: Create a Container component that centers its children
// and applies max-width styling via className
function Container({ children }) {
  // Your code here
}

// Exercise 3: Button with Variants
// TODO: Create a Button component with variant prop (primary, secondary, danger)
// Apply different className based on variant
// Accept children for button text
function Button({ variant, children }) {
  // Your code here
}

// Exercise 4: Input Wrapper
// TODO: Create an InputField component that wraps an input
// Accept label, error, and ...rest props
// Display label above input, error below if present
// Spread rest props to the input element
function InputField({ label, error, ...rest }) {
  // Your code here
}

// Exercise 5: List with Empty State
// TODO: Create an ItemList component that accepts items array and renderItem function
// If items is empty, show "No items found"
// Otherwise, map through items and call renderItem for each
function ItemList({ items, renderItem }) {
  // Your code here
}

// Exercise 6: Conditional Wrapper
// TODO: Create a Modal component with isOpen prop
// Only render children if isOpen is true
// Include a backdrop div and content div
function Modal({ isOpen, children }) {
  // Your code here
}

// Exercise 7: Composition Pattern
// TODO: Create a UserCard component that uses Card from Exercise 1
// Accept user prop with {name, email, role}
// Use Card component with title={user.name}
// Display email and role inside Card
function UserCard({ user }) {
  // Your code here
}

// Exercise 8: Flexible Component with Slots
// TODO: Create a PageLayout component that accepts header, sidebar, and children props
// Render them in a structured layout:
// - header at the top
// - sidebar on the left
// - children as main content
function PageLayout({ header, sidebar, children }) {
  // Your code here
}

// Test Data
/*
const sampleUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "Developer"
};

const sampleItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" }
];
*/

export { Card, Container, Button, InputField, ItemList, Modal, UserCard, PageLayout };
