# Data Fetching & Forms - Sample Project

A comprehensive demonstration of data fetching, form handling, and user interactions in React.

## Features

### Data Fetching
- **Async Data Loading**: Fetch users and posts from JSONPlaceholder API
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error messages and retry functionality
- **Dependent Fetching**: Load posts based on selected user

### Form Management
- **Controlled Components**: All form inputs managed by React state
- **Form Validation**: Real-time validation with error messages
- **Async Submission**: Handle form submission with loading states
- **Form Reset**: Clear form after successful submission

### Search Functionality
- **Debounced Search**: Optimize search with 500ms delay
- **Real-time Filtering**: Filter results as user types
- **Search Loading**: Visual indicator during search

### CRUD Operations
- **Create**: Add new posts (simulated)
- **Read**: Display users and posts
- **Update**: Edit existing posts with modal
- **Delete**: Remove posts with confirmation

### UI Features
- **Tabbed Interface**: Switch between users, posts, and contact form
- **Modal Dialogs**: Edit posts in modal overlay
- **Notifications**: Toast notifications for user actions
- **Responsive Design**: Mobile-friendly layout
- **Professional Styling**: Modern, clean interface

## Project Structure

```
sample/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── styles.css       # Complete styling
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Components

### UserCard
Displays user information with action button to view posts.

### PostCard
Shows post content with edit and delete actions.

### ContactForm
Validated contact form with async submission.

### SearchBar
Debounced search input for filtering users.

### Modal
Reusable modal component for overlays.

### EditPostForm
Form for editing post content.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

## Build

```bash
npm run build
```

## Key Concepts Demonstrated

1. **useEffect for Data Fetching**
   - Fetch data on component mount
   - Clean up side effects
   - Handle dependencies

2. **Async/Await with Fetch API**
   - GET, POST, PUT, DELETE requests
   - Error handling with try/catch
   - Response parsing

3. **Form State Management**
   - Controlled inputs
   - Dynamic validation
   - Error state management

4. **Debouncing**
   - Optimize API calls
   - Reduce unnecessary requests
   - Improve performance

5. **Loading & Error States**
   - User feedback during operations
   - Graceful error handling
   - Retry functionality

6. **Component Composition**
   - Reusable components
   - Props drilling
   - Event handling

## API Reference

This project uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for demo data:

- `GET /users` - Fetch all users
- `GET /posts?userId={id}` - Fetch posts by user
- `POST /posts` - Create post (simulated)
- `PUT /posts/{id}` - Update post (simulated)
- `DELETE /posts/{id}` - Delete post (simulated)

## Best Practices

- Always handle loading and error states
- Validate user input before submission
- Provide visual feedback for async operations
- Use debouncing for search inputs
- Implement proper error boundaries
- Keep components focused and reusable
- Use semantic HTML
- Ensure accessibility

## Learn More

- [React Documentation](https://react.dev/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
