// useReducer, useRef & Form Validation - Exercises

import { useReducer, useRef, useState, useEffect } from 'react';

// Exercise 1: Basic useReducer Counter
// TODO: Create a counter using useReducer
// Actions: INCREMENT, DECREMENT, RESET, SET (with payload)
function CounterReducer() {
  // Your code here
}

// Exercise 2: Todo List with useReducer
// TODO: Create a todo list using useReducer
// Actions: ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_COMPLETED
// Each todo should have: id, text, completed
function TodoReducer() {
  // Your code here
}

// Exercise 3: Form with useReducer
// TODO: Create a form using useReducer to manage multiple fields
// Fields: name, email, password
// Actions: SET_FIELD, RESET_FORM, SET_ERROR
function FormWithReducer() {
  // Your code here
}

// Exercise 4: useRef for Focus Management
// TODO: Create a multi-step form where focus automatically moves to next input
// Use useRef to manage input refs
// Steps: name -> email -> password -> submit
function FocusManagementForm() {
  // Your code here
}

// Exercise 5: useRef for Timer
// TODO: Create a stopwatch using useRef to store interval ID
// Buttons: Start, Stop, Reset
// Display elapsed time in seconds
function Stopwatch() {
  // Your code here
}

// Exercise 6: useRef for Previous Value
// TODO: Create a component that shows current and previous count value
// Use useRef to track previous value
function PreviousValueTracker() {
  // Your code here
}

// Exercise 7: Complex Form Validation
// TODO: Create a registration form with comprehensive validation
// Fields: username, email, password, confirmPassword
// Validation rules:
// - username: min 3 chars, alphanumeric only
// - email: valid email format
// - password: min 8 chars, 1 uppercase, 1 lowercase, 1 number
// - confirmPassword: must match password
// Show errors only after field is touched
function RegistrationForm() {
  // Your code here
}

// Exercise 8: Real-time Validation
// TODO: Create a form with real-time validation
// Validate as user types (with debounce)
// Show validation status: idle, validating, valid, invalid
// Fields: username (check availability via mock API), email
function RealTimeValidationForm() {
  // Your code here
}

// Exercise 9: Shopping Cart with useReducer
// TODO: Create a shopping cart using useReducer
// Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
// Calculate total price (computed value)
// Items: { id, name, price, quantity }
function ShoppingCartReducer() {
  // Your code here
}

// Exercise 10: Scroll to Section with useRef
// TODO: Create a page with multiple sections and navigation
// Use useRef to store references to each section
// Click navigation links to scroll to sections
function ScrollToSectionNav() {
  // Your code here
}

export {
  CounterReducer,
  TodoReducer,
  FormWithReducer,
  FocusManagementForm,
  Stopwatch,
  PreviousValueTracker,
  RegistrationForm,
  RealTimeValidationForm,
  ShoppingCartReducer,
  ScrollToSectionNav
};
