import React, { useState, createContext, useContext } from 'react';

// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Shopping Cart Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems(prev => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeItem = (cartId) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

// Components
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { items } = useContext(CartContext);

  return (
    <header className="header">
      <h1>State Management Demo</h1>
      <div className="header-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'} {theme} mode
        </button>
        <div className="cart-badge">
          🛒 Cart: {items.length} items
        </div>
      </div>
    </header>
  );
}

function ProductCard({ product }) {
  const { addItem } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-icon">{product.icon}</div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="price">${product.price}</span>
        <button onClick={() => addItem(product)} className="btn-add">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductGrid() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, icon: '💻', description: 'Powerful computing' },
    { id: 2, name: 'Phone', price: 699, icon: '📱', description: 'Stay connected' },
    { id: 3, name: 'Headphones', price: 199, icon: '🎧', description: 'Premium sound' },
    { id: 4, name: 'Watch', price: 299, icon: '⌚', description: 'Track your fitness' },
    { id: 5, name: 'Tablet', price: 499, icon: '📱', description: 'Portable productivity' },
    { id: 6, name: 'Camera', price: 799, icon: '📷', description: 'Capture moments' }
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function Cart() {
  const { items, removeItem, clearCart, total } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="cart-section">
        <h2>Shopping Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <div className="cart-header">
        <h2>Shopping Cart ({items.length} items)</h2>
        <button onClick={clearCart} className="btn-clear">
          Clear Cart
        </button>
      </div>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.cartId} className="cart-item">
            <span className="item-icon">{item.icon}</span>
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price}</span>
            </div>
            <button
              onClick={() => removeItem(item.cartId)}
              className="btn-remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <strong>Total:</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>
      <button className="btn-checkout">Checkout</button>
    </div>
  );
}

// Temperature Converter (Lifting State Example)
function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');

  const toFahrenheit = (c) => (c * 9) / 5 + 32;
  const toCelsius = (f) => ((f - 32) * 5) / 9;

  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value) => {
    setCelsius(value === '' ? '' : toCelsius(parseFloat(value)));
  };

  const fahrenheit = celsius === '' ? '' : toFahrenheit(parseFloat(celsius));

  return (
    <div className="converter-section">
      <h2>Temperature Converter</h2>
      <p className="converter-description">
        Example of lifting state up - both inputs share the same state
      </p>
      <div className="converter-inputs">
        <div className="input-group">
          <label>Celsius</label>
          <input
            type="number"
            value={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="converter-arrow">⇄</div>
        <div className="input-group">
          <label>Fahrenheit</label>
          <input
            type="number"
            value={fahrenheit}
            onChange={(e) => handleFahrenheitChange(e.target.value)}
            placeholder="32"
          />
        </div>
      </div>
    </div>
  );
}

// Concepts Summary
function ConceptsSummary() {
  return (
    <div className="concepts-section">
      <h2>State Management Concepts Demonstrated</h2>
      <div className="concepts-grid">
        <div className="concept-card">
          <h3>🔄 Lifting State Up</h3>
          <p>Temperature converter shows how sibling components share state through a common parent</p>
        </div>
        <div className="concept-card">
          <h3>🎨 Context API</h3>
          <p>Theme toggle and cart management use Context to avoid prop drilling</p>
        </div>
        <div className="concept-card">
          <h3>🏪 Provider Pattern</h3>
          <p>ThemeProvider and CartProvider wrap the app to share state globally</p>
        </div>
        <div className="concept-card">
          <h3>⚡ useContext Hook</h3>
          <p>Components consume context values without passing props through every level</p>
        </div>
      </div>
    </div>
  );
}

// Main App
function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <div className="container">
          <TemperatureConverter />
          <h2 className="section-title">Products</h2>
          <ProductGrid />
          <Cart />
          <ConceptsSummary />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
