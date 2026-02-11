# React Router - Sample Project

A comprehensive e-commerce demo application showcasing React Router features.

## What's Demonstrated

- **Basic Navigation**: Link and NavLink components with active styling
- **Dynamic Routes**: URL parameters for product and blog post details
- **Nested Routes**: Dashboard with sidebar navigation and outlet
- **Programmatic Navigation**: useNavigate hook for form submissions
- **404 Handling**: Catch-all route for unknown pages
- **Layout Pattern**: Shared header and footer across routes
- **Multiple Route Levels**: Home, list pages, and detail pages

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)

## Project Structure

```
sample/
├── src/
│   ├── App.jsx      # Main app with all routes and components
│   ├── main.jsx     # Entry point with BrowserRouter
│   └── styles.css   # Complete styling
├── index.html       # HTML template
├── package.json     # Dependencies (includes react-router-dom)
└── vite.config.js   # Vite configuration
```

## Features

### Pages

1. **Home**: Hero section, features, and category links
2. **Products**: Grid of products with search functionality
3. **Product Detail**: Individual product information with back navigation
4. **Blog**: List of blog posts
5. **Blog Post**: Individual post details
6. **About**: Static information page
7. **Dashboard**: Nested routes with sidebar navigation
   - Overview with stats
   - Orders, Profile, Settings pages
8. **404**: Not found page with home navigation

### React Router Concepts

- **BrowserRouter**: Wraps the entire app in main.jsx
- **Routes & Route**: Define path-to-component mappings
- **Link**: Client-side navigation without page reload
- **NavLink**: Navigation links with active state styling
- **useParams**: Extract URL parameters (productId, slug)
- **useNavigate**: Programmatic navigation (form submit, back button)
- **Outlet**: Render child routes in layouts
- **Nested Routes**: Dashboard with multiple sub-pages
- **Index Routes**: Default route for parent paths

## Try It Yourself

- Add new products or blog posts to the mock data
- Create additional nested routes in the dashboard
- Implement query parameter filtering for products
- Add authentication and protected routes
- Create breadcrumb navigation
- Implement lazy loading for routes

## Key Learnings

1. **Navigation**: How to create links and navigate between pages
2. **Dynamic Routes**: Using URL parameters to display specific content
3. **Layouts**: Creating reusable layouts with Outlet
4. **State**: Managing navigation state and history
5. **Best Practices**: Organizing routes and handling 404s

## Next Steps

After mastering React Router, move on to Module 05 to learn about state management patterns including lifting state and Context API.
