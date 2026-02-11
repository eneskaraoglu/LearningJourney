// State Management - Exercises

// Exercise 1: Lifting State Up
// TODO: Create a TemperatureInput component that accepts temperature and onChange props
// Create a TemperatureConverter parent that manages state and renders two inputs (Celsius and Fahrenheit)
function TemperatureInput({ temperature, onChange, scale }) {
  // Your code here
}

function TemperatureConverter() {
  // Your code here
}

// Exercise 2: Shared State Between Siblings
// TODO: Create a FilterInput and ItemList components
// Parent component (FilteredList) should manage the filter state
// FilterInput updates the filter, ItemList displays filtered items
function FilterInput({ filter, onFilterChange }) {
  // Your code here
}

function ItemList({ items, filter }) {
  // Your code here
}

function FilteredList({ items }) {
  // Your code here
}

// Exercise 3: Simple Context
// TODO: Create a ThemeContext with 'light' and 'dark' themes
// Create ThemeProvider component that manages theme state
// Create ThemedButton that consumes the theme context
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  // Your code here
}

function ThemedButton() {
  // Your code here
}

// Exercise 4: Context with Actions
// TODO: Create a CountContext that provides count and increment/decrement functions
// Create CountProvider component
// Create Counter and CountDisplay components that consume the context
const CountContext = React.createContext();

function CountProvider({ children }) {
  // Your code here
}

function Counter() {
  // Your code here
}

function CountDisplay() {
  // Your code here
}

// Exercise 5: User Context
// TODO: Create UserContext with user state and login/logout functions
// Create UserProvider that manages authentication state
// Create UserProfile component that displays user info if logged in
const UserContext = React.createContext();

function UserProvider({ children }) {
  // Your code here
}

function UserProfile() {
  // Your code here
}

// Exercise 6: Multi-level State Lifting
// TODO: Create a shopping cart system
// Cart component displays total items
// ProductList renders products
// Product component has "Add to Cart" button
// State should be managed in parent ShoppingApp
function Product({ product, onAddToCart }) {
  // Your code here
}

function ProductList({ products, onAddToCart }) {
  // Your code here
}

function Cart({ items }) {
  // Your code here
}

function ShoppingApp() {
  // Your code here
}

// Exercise 7: Context with Multiple Values
// TODO: Create AppContext that provides:
// - language (en/es)
// - setLanguage function
// - translations object
// Create LanguageSwitcher and TranslatedText components
const AppContext = React.createContext();

function AppProvider({ children }) {
  // Your code here
}

function LanguageSwitcher() {
  // Your code here
}

function TranslatedText({ textKey }) {
  // Your code here
}

// Exercise 8: Avoiding Prop Drilling
// TODO: Refactor this prop drilling example to use Context
// Current structure: App -> Header -> Navigation -> UserMenu -> UserButton
// UserButton needs user data that comes from App
function UserButton({ user }) {
  return <button>{user.name}</button>;
}

function UserMenu({ user }) {
  return <UserButton user={user} />;
}

function Navigation({ user }) {
  return <UserMenu user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function App() {
  const user = { name: "John Doe", role: "admin" };
  return <Header user={user} />;
}

// TODO: Refactor the above using Context to eliminate prop drilling

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
  TranslatedText
};
