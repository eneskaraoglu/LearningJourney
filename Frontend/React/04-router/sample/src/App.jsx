// React Router Sample App
// Full-featured demo with navigation, nested routes, and dynamic routing

import { useState } from 'react';
import { Routes, Route, Link, NavLink, useParams, useNavigate, Outlet, Navigate } from 'react-router-dom';

// Mock Data
const products = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'electronics', description: 'High-performance laptop for professionals', stock: 15 },
  { id: 2, name: 'Wireless Mouse', price: 29, category: 'electronics', description: 'Ergonomic wireless mouse', stock: 50 },
  { id: 3, name: 'Coffee Maker', price: 89, category: 'home', description: 'Programmable coffee maker', stock: 20 },
  { id: 4, name: 'Running Shoes', price: 120, category: 'sports', description: 'Comfortable running shoes', stock: 30 },
  { id: 5, name: 'Yoga Mat', price: 35, category: 'sports', description: 'Non-slip yoga mat', stock: 40 },
  { id: 6, name: 'Desk Lamp', price: 45, category: 'home', description: 'Adjustable LED desk lamp', stock: 25 }
];

const blogPosts = [
  { id: 1, title: 'Getting Started with React Router', slug: 'react-router-guide', author: 'Jane Doe', date: '2024-01-15', content: 'React Router is the standard routing library...' },
  { id: 2, title: 'State Management Best Practices', slug: 'state-management', author: 'John Smith', date: '2024-01-20', content: 'Managing state effectively is crucial...' },
  { id: 3, title: 'Building Performant React Apps', slug: 'react-performance', author: 'Sarah Johnson', date: '2024-02-01', content: 'Performance optimization techniques...' }
];

// Layout Component
function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🛒 ShopHub</h1>
          <Navigation />
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2024 ShopHub. React Router Demo Project.</p>
      </footer>
    </div>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Products
      </NavLink>
      <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Blog
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        About
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Dashboard
      </NavLink>
    </nav>
  );
}

// Home Page
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopHub</h1>
        <p>Your one-stop shop for everything you need</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Browse Products
        </button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📦 Wide Selection</h3>
          <p>Browse through our diverse product catalog</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Fast Shipping</h3>
          <p>Get your orders delivered quickly</p>
        </div>
        <div className="feature-card">
          <h3>💳 Secure Checkout</h3>
          <p>Shop with confidence</p>
        </div>
      </div>

      <div className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <Link to="/products?category=electronics" className="category-item">Electronics</Link>
          <Link to="/products?category=home" className="category-item">Home & Garden</Link>
          <Link to="/products?category=sports" className="category-item">Sports</Link>
        </div>
      </div>
    </div>
  );
}

// Products Page
function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">📦</div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="stock">In Stock: {product.stock}</p>
            <Link to={`/products/${product.id}`} className="btn-secondary">
              View Details
            </Link>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="no-results">No products found</p>
      )}
    </div>
  );
}

// Product Detail Page
function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/products')} className="back-btn">
        ← Back to Products
      </button>
      <div className="detail-content">
        <div className="detail-image">📦</div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-category">Category: {product.category}</p>
          <p className="detail-description">{product.description}</p>
          <p className="detail-stock">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <button className="btn-primary" disabled={product.stock === 0}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Blog Page
function BlogPage() {
  return (
    <div className="blog-page">
      <h1>Blog</h1>
      <div className="blog-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-card">
            <h2>{post.title}</h2>
            <p className="blog-meta">By {post.author} • {post.date}</p>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/blog/${post.slug}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Blog Post Detail
function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <div className="not-found">Post not found</div>;
  }

  return (
    <div className="blog-post">
      <button onClick={() => navigate('/blog')} className="back-btn">
        ← Back to Blog
      </button>
      <article>
        <h1>{post.title}</h1>
        <p className="post-meta">By {post.author} • {post.date}</p>
        <div className="post-content">
          <p>{post.content}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </article>
    </div>
  );
}

// About Page
function About() {
  return (
    <div className="about-page">
      <h1>About ShopHub</h1>
      <p>We are a modern e-commerce platform built with React and React Router.</p>
      <p>This demo showcases various routing features including:</p>
      <ul>
        <li>Basic navigation with Link and NavLink</li>
        <li>Dynamic routes with URL parameters</li>
        <li>Nested routes with layouts</li>
        <li>Programmatic navigation</li>
        <li>Protected routes</li>
        <li>404 error handling</li>
      </ul>
    </div>
  );
}

// Dashboard Layout (Nested Routes)
function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/orders" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Orders
          </NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Profile
          </NavLink>
          <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            Settings
          </NavLink>
        </nav>
      </aside>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">24</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-number">$1,234</p>
        </div>
        <div className="stat-card">
          <h3>Products</h3>
          <p className="stat-number">{products.length}</p>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h1>Your Orders</h1>
      <p>Order management coming soon...</p>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h1>Your Profile</h1>
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Configure your preferences</p>
    </div>
  );
}

// 404 Not Found
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate('/')} className="btn-primary">
        Go Home
      </button>
    </div>
  );
}

// Main App
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
