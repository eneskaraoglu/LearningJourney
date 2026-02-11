/**
 * MODULE 11: API Integration & User Module - Exercises
 *
 * These exercises focus on building a complete user management system with:
 * - RESTful API integration
 * - CRUD operations (Create, Read, Update, Delete)
 * - Error handling and loading states
 * - Service layer pattern
 * - Form validation
 * - Modal dialogs
 * - Optimistic updates
 *
 * For solutions, see 03-solutions.jsx
 */

import { useState, useEffect } from 'react';

/* ============================================
   EXERCISE 1: API Service Layer
   ============================================
   Create a service layer for API calls.

   Requirements:
   - Create an ApiService class with methods for all HTTP verbs
   - Include proper error handling
   - Support JSON requests and responses
   - Handle network errors gracefully

   Implement:
   - getUsers() - Fetch all users
   - getUser(id) - Fetch single user
   - createUser(data) - Create new user
   - updateUser(id, data) - Update existing user
   - deleteUser(id) - Delete user
*/

class ApiService {
  constructor(baseURL) {
    // TODO: Initialize with base URL
  }

  async getUsers() {
    // TODO: Implement GET /users
  }

  async getUser(id) {
    // TODO: Implement GET /users/:id
  }

  async createUser(data) {
    // TODO: Implement POST /users
  }

  async updateUser(id, data) {
    // TODO: Implement PUT /users/:id
  }

  async deleteUser(id) {
    // TODO: Implement DELETE /users/:id
  }
}

function Exercise1() {
  return (
    <div className="exercise">
      <h2>Exercise 1: API Service Layer</h2>
      <p>Create a reusable API service class with CRUD methods.</p>
    </div>
  );
}

/* ============================================
   EXERCISE 2: Fetch and Display Users
   ============================================
   Create a component that fetches and displays users.

   Requirements:
   - Fetch users from JSONPlaceholder API on mount
   - Show loading state while fetching
   - Display users in a clean table/card layout
   - Handle errors gracefully
   - Show empty state if no users
*/

function Exercise2() {
  // TODO: Implement user fetching with loading and error states

  return (
    <div className="exercise">
      <h2>Exercise 2: Fetch and Display Users</h2>
      {/* TODO: Add loading, error, and user list UI */}
    </div>
  );
}

/* ============================================
   EXERCISE 3: Create User Form
   ============================================
   Build a form to create new users.

   Requirements:
   - Form fields: name, email, phone, website
   - Client-side validation
   - Show loading state during submission
   - Handle API errors
   - Clear form after successful creation
   - Show success message
*/

function Exercise3() {
  // TODO: Implement create user form

  return (
    <div className="exercise">
      <h2>Exercise 3: Create User Form</h2>
      {/* TODO: Add form with validation and submission */}
    </div>
  );
}

/* ============================================
   EXERCISE 4: Edit User Modal
   ============================================
   Create a modal dialog for editing users.

   Requirements:
   - Modal with backdrop (click outside to close)
   - Pre-populate form with existing user data
   - Validate before submitting
   - Show loading state during update
   - Close modal on success
   - Handle errors
*/

function Exercise4() {
  // TODO: Implement edit modal with form

  return (
    <div className="exercise">
      <h2>Exercise 4: Edit User Modal</h2>
      {/* TODO: Add modal, form, and edit functionality */}
    </div>
  );
}

/* ============================================
   EXERCISE 5: Delete User with Confirmation
   ============================================
   Implement user deletion with confirmation dialog.

   Requirements:
   - Show confirmation modal before deleting
   - Display user info in confirmation
   - Show loading state during deletion
   - Remove user from list on success
   - Handle errors
   - Prevent accidental deletions
*/

function Exercise5() {
  // TODO: Implement delete with confirmation

  return (
    <div className="exercise">
      <h2>Exercise 5: Delete User with Confirmation</h2>
      {/* TODO: Add delete button and confirmation modal */}
    </div>
  );
}

/* ============================================
   EXERCISE 6: Search and Filter Users
   ============================================
   Add search functionality to filter users.

   Requirements:
   - Search by name, email, or username
   - Real-time filtering as user types
   - Case-insensitive search
   - Show result count
   - Clear search button
   - Handle empty results
*/

function Exercise6() {
  // TODO: Implement search functionality

  return (
    <div className="exercise">
      <h2>Exercise 6: Search and Filter Users</h2>
      {/* TODO: Add search input and filtered results */}
    </div>
  );
}

/* ============================================
   EXERCISE 7: Pagination
   ============================================
   Add pagination to the user list.

   Requirements:
   - Show 5 users per page
   - Previous/Next buttons
   - Current page indicator
   - Disable buttons appropriately
   - Calculate total pages
   - Reset to page 1 on search
*/

function Exercise7() {
  // TODO: Implement pagination

  return (
    <div className="exercise">
      <h2>Exercise 7: Pagination</h2>
      {/* TODO: Add pagination controls and logic */}
    </div>
  );
}

/* ============================================
   EXERCISE 8: Complete User Management System
   ============================================
   Combine all previous exercises into a complete system.

   Requirements:
   - Full CRUD operations
   - Search and filter
   - Pagination
   - Loading states for all operations
   - Error handling throughout
   - Success notifications
   - Responsive design
   - Professional UI

   This should be a production-ready user management interface.
*/

function Exercise8() {
  // TODO: Implement complete user management system

  return (
    <div className="exercise">
      <h2>Exercise 8: Complete User Management System</h2>
      {/* TODO: Build full-featured user management interface */}
    </div>
  );
}

// Export all exercises
export default function Exercises() {
  return (
    <div className="exercises-container">
      <h1>Module 11: API Integration & User Module - Exercises</h1>

      <div className="exercise-info">
        <h3>Learning Objectives:</h3>
        <ul>
          <li>Create reusable API service layers</li>
          <li>Implement full CRUD operations</li>
          <li>Handle loading and error states</li>
          <li>Build modal dialogs and forms</li>
          <li>Add search and pagination</li>
          <li>Create production-quality user interfaces</li>
        </ul>
        <p><strong>API:</strong> Use JSONPlaceholder (https://jsonplaceholder.typicode.com)</p>
      </div>

      <Exercise1 />
      <Exercise2 />
      <Exercise3 />
      <Exercise4 />
      <Exercise5 />
      <Exercise6 />
      <Exercise7 />
      <Exercise8 />
    </div>
  );
}
