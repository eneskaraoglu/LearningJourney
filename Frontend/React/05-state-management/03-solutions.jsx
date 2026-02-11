// State Management - Solutions

import React, { useState, createContext, useContext } from 'react';

// Exercise 1: Lifting State Up
function TemperatureInput({ temperature, onChange, scale }) {
  return (
    <div>
      <label>
        Temperature in {scale === 'c' ? 'Celsius' : 'Fahrenheit'}:
        <input
          type="number"
          value={temperature}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

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
    <div>
      <TemperatureInput
        temperature={celsius}
        onChange={handleCelsiusChange}
        scale="c"
      />
      <TemperatureInput
        temperature={fahrenheit}
        onChange={handleFahrenheitChange}
        scale="f"
      />
    </div>
  );
}

// Exercise 2: Shared State Between Siblings
function FilterInput({ filter, onFilterChange }) {
  return (
    <input
      type="text"
      placeholder="Filter items..."
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
    />
  );
}

function ItemList({ items, filter }) {
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function FilteredList({ items }) {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <FilterInput filter={filter} onFilterChange={setFilter} />
      <ItemList items={items} filter={filter} />
    </div>
  );
}

// Exercise 3: Simple Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Current theme: {theme}
    </button>
  );
}

// Exercise 4: Context with Actions
const CountContext = createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <CountContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CountContext.Provider>
  );
}

function Counter() {
  const { increment, decrement, reset } = useContext(CountContext);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function CountDisplay() {
  const { count } = useContext(CountContext);
  return <h2>Count: {count}</h2>;
}

// Exercise 5: User Context
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user, login, logout } = useContext(UserContext);

  if (!user) {
    return (
      <button onClick={() => login({ name: 'John Doe', email: 'john@example.com' })}>
        Login
      </button>
    );
  }

  return (
    <div>
      <h3>Welcome, {user.name}!</h3>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Exercise 6: Multi-level State Lifting
function Product({ product, onAddToCart }) {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Cart ({items.length} items)</h2>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

function ShoppingApp() {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div>
      <Cart items={cartItems} />
      <ProductList products={products} onAddToCart={addToCart} />
    </div>
  );
}

// Exercise 7: Context with Multiple Values
const AppContext = createContext();

function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      welcome: 'Welcome',
      goodbye: 'Goodbye',
      hello: 'Hello'
    },
    es: {
      welcome: 'Bienvenido',
      goodbye: 'Adiós',
      hello: 'Hola'
    }
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </AppContext.Provider>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useContext(AppContext);

  return (
    <div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('es')}>Español</button>
      <p>Current: {language}</p>
    </div>
  );
}

function TranslatedText({ textKey }) {
  const { language, translations } = useContext(AppContext);
  return <span>{translations[language][textKey]}</span>;
}

// Exercise 8: Avoiding Prop Drilling - Refactored
const UserContextRefactored = createContext();

function UserProviderRefactored({ children }) {
  const [user] = useState({ name: "John Doe", role: "admin" });

  return (
    <UserContextRefactored.Provider value={user}>
      {children}
    </UserContextRefactored.Provider>
  );
}

function UserButtonRefactored() {
  const user = useContext(UserContextRefactored);
  return <button>{user.name}</button>;
}

function UserMenuRefactored() {
  return <UserButtonRefactored />;
}

function NavigationRefactored() {
  return <UserMenuRefactored />;
}

function HeaderRefactored() {
  return <NavigationRefactored />;
}

function AppRefactored() {
  return (
    <UserProviderRefactored>
      <HeaderRefactored />
    </UserProviderRefactored>
  );
}

// Key Takeaways:
// 1. Lift state to the nearest common ancestor
// 2. Use Context for deeply nested components
// 3. Separate concerns: state logic in Provider, display in consumers
// 4. Pass both data and functions through Context
// 5. Multiple contexts for different concerns

export {
  TemperatureInput,
  TemperatureConverter,
  FilterInput,
  ItemList,
  FilteredList,
  ThemeContext,
  ThemeProvider,
  ThemedButton,
  CountContext,
  CountProvider,
  Counter,
  CountDisplay,
  UserContext,
  UserProvider,
  UserProfile,
  Product,
  ProductList,
  Cart,
  ShoppingApp,
  AppContext,
  AppProvider,
  LanguageSwitcher,
  TranslatedText,
  UserContextRefactored,
  UserProviderRefactored,
  AppRefactored
};
