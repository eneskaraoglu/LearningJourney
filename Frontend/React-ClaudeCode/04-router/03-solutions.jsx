// React Router - Solutions

import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  Navigate,
  Outlet,
  useSearchParams
} from 'react-router-dom';

// Exercise 1: Basic Routes
function Exercise1() {
  function Home() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome to our website!</p>
      </div>
    );
  }

  function About() {
    return (
      <div>
        <h1>About Page</h1>
        <p>Learn more about us.</p>
      </div>
    );
  }

  function Contact() {
    return (
      <div>
        <h1>Contact Page</h1>
        <p>Get in touch with us.</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/about">About</Link> |
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 2: Active Navigation
function Exercise2() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'red' : 'blue',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
    padding: '10px'
  });

  return (
    <BrowserRouter>
      <nav style={{ marginBottom: '20px' }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/services" style={linkStyle}>Services</NavLink>
        <NavLink to="/portfolio" style={linkStyle}>Portfolio</NavLink>
        <NavLink to="/blog" style={linkStyle}>Blog</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/portfolio" element={<h1>Portfolio</h1>} />
        <Route path="/blog" element={<h1>Blog</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 3: URL Parameters
function Exercise3() {
  function UserProfile() {
    const { userId } = useParams();

    return (
      <div>
        <h1>User Profile: {userId}</h1>
        <p>Viewing details for user {userId}</p>
      </div>
    );
  }

  function UserList() {
    return (
      <div>
        <h1>User List</h1>
        <ul>
          <li><Link to="/users/1">User 1</Link></li>
          <li><Link to="/users/2">User 2</Link></li>
          <li><Link to="/users/3">User 3</Link></li>
        </ul>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 4: Nested Routes with Layout
function Exercise4() {
  function DashboardLayout() {
    return (
      <div style={{ display: 'flex' }}>
        <aside style={{ width: '200px', padding: '20px', background: '#f0f0f0' }}>
          <h2>Dashboard</h2>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/dashboard">Overview</Link></li>
              <li><Link to="/dashboard/stats">Stats</Link></li>
              <li><Link to="/dashboard/reports">Reports</Link></li>
            </ul>
          </nav>
        </aside>
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    );
  }

  function Overview() {
    return <h1>Dashboard Overview</h1>;
  }

  function Stats() {
    return <h1>Statistics</h1>;
  }

  function Reports() {
    return <h1>Reports</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="stats" element={<Stats />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 5: Product Catalog
function Exercise5() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, description: 'Powerful laptop' },
    { id: 2, name: 'Phone', price: 699, description: 'Latest smartphone' },
    { id: 3, name: 'Tablet', price: 499, description: 'Portable tablet' }
  ];

  function ProductList() {
    return (
      <div>
        <h1>Products</h1>
        <div style={{ display: 'grid', gap: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px' }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function ProductDetail() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div>
        <button onClick={() => navigate('/products')}>Back to Products</button>
        <h1>{product.name}</h1>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 6: 404 Not Found
function Exercise6() {
  function NotFound() {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 7: Programmatic Navigation
function Exercise7() {
  function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Login:', formData);
      navigate('/dashboard');
    };

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate(-1)}>Go Back</button>
        </form>
      </div>
    );
  }

  function Dashboard() {
    return <h1>Dashboard (Logged In)</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 8: Search with Query Parameters
function Exercise8() {
  function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const handleSearch = (e) => {
      const value = e.target.value;
      if (value) {
        setSearchParams({ q: value });
      } else {
        setSearchParams({});
      }
    };

    return (
      <div>
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search..."
          defaultValue={query}
          onChange={handleSearch}
        />
        {query && (
          <div>
            <h2>Results for: "{query}"</h2>
            <p>Showing results for {query}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exercise 9: Protected Routes
function Exercise9() {
  function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function ProtectedRoute({ children }) {
      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }
      return children;
    }

    function LoginPage() {
      const navigate = useNavigate();

      const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/protected');
      };

      return (
        <div>
          <h1>Login Required</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      );
    }

    function ProtectedContent() {
      return (
        <div>
          <h1>Protected Content</h1>
          <p>You are authenticated!</p>
          <button onClick={() => setIsAuthenticated(false)}>Logout</button>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home (Public)</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return <App />;
}

// Exercise 10: Multi-level Nested Routes
function Exercise10() {
  const blogData = {
    tech: [
      { id: 1, title: 'React Tips', content: 'Learn React best practices...' },
      { id: 2, title: 'JavaScript ES2024', content: 'New JS features...' }
    ],
    lifestyle: [
      { id: 3, title: 'Healthy Living', content: 'Tips for healthy life...' },
      { id: 4, title: 'Travel Guide', content: 'Best places to visit...' }
    ]
  };

  function BlogHome() {
    return (
      <div>
        <h1>Blog</h1>
        <h2>Categories:</h2>
        <ul>
          <li><Link to="/blog/tech">Tech</Link></li>
          <li><Link to="/blog/lifestyle">Lifestyle</Link></li>
        </ul>
      </div>
    );
  }

  function CategoryPosts() {
    const { category } = useParams();
    const posts = blogData[category] || [];

    return (
      <div>
        <h1>{category.toUpperCase()} Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/blog/${category}/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function PostDetail() {
    const { category, postId } = useParams();
    const posts = blogData[category] || [];
    const post = posts.find(p => p.id === parseInt(postId));

    if (!post) return <div>Post not found</div>;

    return (
      <div>
        <Link to={`/blog/${category}`}>Back to {category}</Link>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/:category" element={<CategoryPosts />} />
        <Route path="/blog/:category/:postId" element={<PostDetail />} />
      </Routes>
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
