// React Hooks - Exercises
// Complete each exercise using useState and useEffect

import { useState, useEffect } from 'react';

// Exercise 1: Simple Counter
// TODO: Create a counter component with increment and decrement buttons
// State: count (initialized to 0)
// Buttons: Increment (+1), Decrement (-1), Reset (back to 0)
function Counter() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 2: Input Mirror
// TODO: Create a component with an input field
// Display the input value in real-time below the input
// Add a character count (e.g., "Characters: 12")
function InputMirror() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 3: Toggle Visibility
// TODO: Create a component with a button and a message
// Clicking the button toggles the visibility of the message
// Button text should change: "Show Message" / "Hide Message"
function ToggleMessage() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 4: Todo List with State
// TODO: Create a todo list with add and remove functionality
// State: todos (array), inputValue (string)
// Each todo should have: id, text, completed
// Features: Add todo, Remove todo, Mark as complete (toggle)
function TodoList() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 5: Form with Multiple Inputs
// TODO: Create a user registration form
// Fields: username, email, password
// Store in a single state object
// Display the form data below (not the password!)
function RegistrationForm() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 6: Document Title Updater
// TODO: Create a component with an input field
// Use useEffect to update the document title with the input value
// Default title: "React App"
// When typing: "React App - [user input]"
function TitleUpdater() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 7: Timer Component
// TODO: Create a timer that counts seconds
// Features:
// - Start/Stop button
// - Reset button
// - Display format: "00:15" (minutes:seconds)
// Use useEffect to manage the interval
function Timer() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Exercise 8: Data Fetcher (Mock)
// TODO: Create a component that "fetches" user data
// Use setTimeout to simulate an API call (2 seconds delay)
// Mock data: { id: 1, name: "John Doe", email: "john@example.com" }
// Show loading state while fetching
// Display user data after loading
// Use useEffect to trigger the fetch on mount
function UserProfile() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Bonus Exercise 9: Color Picker
// TODO: Create a color picker with RGB sliders
// Three sliders for R, G, B (0-255 each)
// Display the current color as a colored box
// Show the RGB value and hex code
function ColorPicker() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Bonus Exercise 10: Local Storage Counter
// TODO: Create a counter that persists in localStorage
// Load initial value from localStorage
// Save to localStorage whenever count changes
// Add a "Clear Storage" button
function PersistentCounter() {
  // Your code here

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

export {
  Counter,
  InputMirror,
  ToggleMessage,
  TodoList,
  RegistrationForm,
  TitleUpdater,
  Timer,
  UserProfile,
  ColorPicker,
  PersistentCounter
};
