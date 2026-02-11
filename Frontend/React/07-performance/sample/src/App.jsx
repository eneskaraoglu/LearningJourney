import React, { useState, useMemo, useCallback, lazy, Suspense, Profiler } from 'react';

// Lazy loaded components
const HeavyChart = lazy(() => import('./components/HeavyChart'));
const DataTable = lazy(() => import('./components/DataTable'));

// Optimized Product Card Component
const ProductCard = React.memo(({ product, onAddToCart }) => {
  console.log('ProductCard rendered:', product.name);

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-badge">${product.price}</div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <div className="product-rating">
          {'⭐'.repeat(product.rating)}
        </div>
      </div>
      <button onClick={() => onAddToCart(product)} className="btn-primary">
        Add to Cart
      </button>
    </div>
  );
});

// Optimized Cart Component
const Cart = React.memo(({ items, onRemove }) => {
  const total = useMemo(() => {
    console.log('Calculating cart total...');
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <div className="cart">
      <h2>Shopping Cart ({itemCount} items)</h2>
      <div className="cart-items">
        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => onRemove(item.id)} className="btn-danger">
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
});

// Search component with debouncing
function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  // Debounce search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {loading && <span className="search-loading">Searching...</span>}
    </div>
  );
}

// Performance metrics display
function PerformanceMetrics({ renderCount, lastRenderTime }) {
  return (
    <div className="performance-metrics">
      <div className="metric">
        <span className="metric-label">Render Count:</span>
        <span className="metric-value">{renderCount}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Last Render:</span>
        <span className="metric-value">{lastRenderTime.toFixed(2)}ms</span>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [products] = useState([
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, rating: 5 },
    { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29, rating: 4 },
    { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 89, rating: 5 },
    { id: 4, name: 'USB-C Hub', category: 'Electronics', price: 49, rating: 4 },
    { id: 5, name: 'Monitor 27"', category: 'Electronics', price: 399, rating: 5 },
    { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79, rating: 4 },
    { id: 7, name: 'Desk Lamp', category: 'Furniture', price: 45, rating: 4 },
    { id: 8, name: 'Office Chair', category: 'Furniture', price: 299, rating: 5 },
    { id: 9, name: 'Standing Desk', category: 'Furniture', price: 599, rating: 5 },
    { id: 10, name: 'Bookshelf', category: 'Furniture', price: 149, rating: 4 }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searching, setSearching] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState(0);

  // Profiler callback
  const onRenderCallback = useCallback((id, phase, actualDuration) => {
    setLastRenderTime(actualDuration);
    setRenderCount(prev => prev + 1);
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  // Memoized categories
  const categories = useMemo(() => {
    return ['all', ...new Set(products.map(p => p.category))];
  }, [products]);

  // Memoized cart statistics
  const cartStats = useMemo(() => {
    console.log('Calculating cart statistics...');
    return {
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalValue: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      uniqueProducts: cartItems.length
    };
  }, [cartItems]);

  // Optimized add to cart function
  const handleAddToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Optimized remove from cart function
  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Optimized search handler
  const handleSearch = useCallback((query) => {
    setSearching(true);
    setTimeout(() => {
      setSearchQuery(query);
      setSearching(false);
    }, 100);
  }, []);

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <div className="app">
        <header className="app-header">
          <h1>Performance Optimized Store</h1>
          <p>Demonstrating React performance optimization techniques</p>
        </header>

        <PerformanceMetrics
          renderCount={renderCount}
          lastRenderTime={lastRenderTime}
        />

        <div className="app-content">
          <aside className="sidebar">
            <Cart items={cartItems} onRemove={handleRemoveFromCart} />

            <div className="cart-stats">
              <h3>Cart Statistics</h3>
              <p>Unique Products: {cartStats.uniqueProducts}</p>
              <p>Total Items: {cartStats.totalItems}</p>
              <p>Total Value: ${cartStats.totalValue.toFixed(2)}</p>
            </div>

            <div className="analytics-section">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="btn-secondary"
              >
                {showAnalytics ? 'Hide' : 'Show'} Analytics
              </button>

              {showAnalytics && (
                <Suspense fallback={<div className="loading">Loading analytics...</div>}>
                  <div className="lazy-content">
                    <h3>Sales Analytics</h3>
                    <p>This section is lazy loaded!</p>
                    <div className="analytics-mock">
                      <div className="stat-box">
                        <h4>Today's Sales</h4>
                        <p className="stat-value">${cartStats.totalValue.toFixed(2)}</p>
                      </div>
                      <div className="stat-box">
                        <h4>Items Sold</h4>
                        <p className="stat-value">{cartStats.totalItems}</p>
                      </div>
                    </div>
                  </div>
                </Suspense>
              )}
            </div>
          </aside>

          <main className="main-content">
            <div className="filters">
              <SearchBar onSearch={handleSearch} loading={searching} />

              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <div className="empty-state">
                  <p>No products found</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>
          </main>
        </div>

        <footer className="app-footer">
          <div className="optimization-info">
            <h3>Optimizations Applied:</h3>
            <ul>
              <li>✓ React.memo for ProductCard and Cart</li>
              <li>✓ useMemo for filtered products and calculations</li>
              <li>✓ useCallback for event handlers</li>
              <li>✓ Lazy loading for analytics section</li>
              <li>✓ Debounced search (300ms delay)</li>
              <li>✓ Performance profiling enabled</li>
            </ul>
          </div>
          <p className="tip">
            <strong>Tip:</strong> Open the browser console to see render logs and optimization effects!
          </p>
        </footer>
      </div>
    </Profiler>
  );
}

export default App;
