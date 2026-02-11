// React Router - Exercises
// Complete each exercise using React Router

import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Exercise 1: Basic Routes
// TODO: Create a basic multi-page app with three routes:
// - "/" renders Home component
// - "/about" renders About component
// - "/contact" renders Contact component
// Include navigation links using Link component
function Exercise1() {
  function Home() {
    return <h1>Home Page</h1>;
  }

  function About() {
    return <h1>About Page</h1>;
  }

  function Contact() {
    return <h1>Contact Page</h1>;
  }

  return (
    <BrowserRouter>
      {/* Add navigation here */}
      {/* Add routes here */}
    </BrowserRouter>
  );
}

// Exercise 2: Active Navigation
// TODO: Create a navigation bar with NavLink components
// Style the active link differently (e.g., different color or bold)
// Routes: Home, Services, Portfolio, Blog
function Exercise2() {
  return (
    <BrowserRouter>
      <nav>
        {/* Add NavLink components here */}
      </nav>
      {/* Add routes */}
    </BrowserRouter>
  );
}

// Exercise 3: URL Parameters
// TODO: Create a user profile page that displays user ID from URL
// Route: "/users/:userId"
// Display: "User Profile: [userId]"
// Add links to navigate to different user profiles (e.g., /users/1, /users/2, /users/3)
function Exercise3() {
  function UserProfile() {
    // Use useParams to get userId
    // Display the user ID
  }

  return (
    <BrowserRouter>
      {/* Add navigation and routes */}
    </BrowserRouter>
  );
}

// Exercise 4: Nested Routes with Layout
// TODO: Create a dashboard layout with nested routes
// Layout should have a sidebar with links and an Outlet for content
// Routes:
// - "/dashboard" renders overview (index route)
// - "/dashboard/stats" renders stats
// - "/dashboard/reports" renders reports
function Exercise4() {
  function DashboardLayout() {
    // Create layout with sidebar and Outlet
  }

  return (
    <BrowserRouter>
      {/* Setup nested routes */}
    </BrowserRouter>
  );
}

// Exercise 5: Product Catalog with Dynamic Routes
// TODO: Create a product catalog with list and detail pages
// - "/products" shows list of all products
// - "/products/:productId" shows product details
// Use sample data: [{ id: 1, name: "Laptop", price: 999 }, ...]
function Exercise5() {
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 499 }
  ];

  function ProductList() {
    // Display list of products with links to detail pages
  }

  function ProductDetail() {
    // Get productId from URL and display product details
  }

  return (
    <BrowserRouter>
      {/* Setup routes */}
    </BrowserRouter>
  );
}

// Exercise 6: 404 Not Found Page
// TODO: Add a catch-all route that displays a 404 page
// Include a link to navigate back home
function Exercise6() {
  function NotFound() {
    // Create 404 page component
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        {/* Add catch-all route here */}
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 7: Programmatic Navigation
// TODO: Create a login form that navigates to dashboard on submit
// Use useNavigate hook
// Add a "Go Back" button that navigates to previous page
function Exercise7() {
  function LoginForm() {
    // Use useNavigate
    // Create form with email and password
    // Navigate to /dashboard on submit
  }

  return (
    <BrowserRouter>
      {/* Setup routes */}
    </BrowserRouter>
  );
}

// Exercise 8: Search with Query Parameters
// TODO: Create a search page that uses query parameters
// - Display search term from URL (?q=searchterm)
// - Update URL when user types in search box
// Use useSearchParams hook
function Exercise8() {
  function SearchPage() {
    // Use useSearchParams
    // Get 'q' parameter and display results
    // Update URL when search changes
  }

  return (
    <BrowserRouter>
      {/* Setup route */}
    </BrowserRouter>
  );
}

// Bonus Exercise 9: Protected Routes
// TODO: Create a protected route that redirects to login if not authenticated
// Use a simple useState for authentication status
// Routes:
// - "/login" - Login page with button to authenticate
// - "/protected" - Protected content (only accessible when logged in)
function Exercise9() {
  function ProtectedRoute({ children }) {
    // Check if authenticated
    // Redirect to /login if not
    // Return children if authenticated
  }

  return (
    <BrowserRouter>
      {/* Setup routes with protected route */}
    </BrowserRouter>
  );
}

// Bonus Exercise 10: Multi-level Nested Routes
// TODO: Create a blog with multi-level routes
// Routes:
// - "/blog" - Blog home (list of categories)
// - "/blog/:category" - Posts in category
// - "/blog/:category/:postId" - Individual post
function Exercise10() {
  const blogData = {
    tech: [
      { id: 1, title: 'React Tips' },
      { id: 2, title: 'JavaScript ES2024' }
    ],
    lifestyle: [
      { id: 3, title: 'Healthy Living' },
      { id: 4, title: 'Travel Guide' }
    ]
  };

  return (
    <BrowserRouter>
      {/* Setup multi-level routes */}
    </BrowserRouter>
  );
}

export {
  Exercise1,
  Exercise2,
  Exercise3,
  Exercise4,
  Exercise5,
  Exercise6,
  Exercise7,
  Exercise8,
  Exercise9,
  Exercise10
};
