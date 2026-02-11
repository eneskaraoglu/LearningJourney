# Performance Optimization - Sample Project

A comprehensive demonstration of React performance optimization techniques in a real-world e-commerce application.

## Features Demonstrated

### 1. React.memo
- ProductCard component prevents re-renders when props don't change
- Cart component only updates when cart items change
- Significant performance improvement with large product lists

### 2. useMemo
- Filtered products calculation is memoized
- Cart statistics (total, count) are computed only when needed
- Category list extraction from products

### 3. useCallback
- Event handlers (addToCart, removeFromCart) maintain stable references
- Search handler is optimized to prevent recreation
- Essential for components wrapped in React.memo

### 4. Lazy Loading
- Analytics section loads on demand
- Reduces initial bundle size
- Improves first paint performance

### 5. Debouncing
- Search input debounced with 300ms delay
- Prevents excessive filtering operations
- Improves responsiveness

### 6. Performance Profiling
- Built-in Profiler component tracks render times
- Performance metrics displayed in real-time
- Helps identify optimization opportunities

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
sample/
├── src/
│   ├── App.jsx          # Main optimized application
│   ├── main.jsx         # Entry point
│   └── styles.css       # Complete styling
├── index.html
├── package.json
├── vite.config.js       # Optimized build config
└── README.md
```

## Performance Techniques

### React.memo Example
```jsx
const ProductCard = React.memo(({ product, onAddToCart }) => {
  // Only re-renders when product or onAddToCart changes
  return <div>{product.name}</div>;
});
```

### useMemo Example
```jsx
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === category);
}, [products, category]);
```

### useCallback Example
```jsx
const handleAddToCart = useCallback((product) => {
  setCart(prev => [...prev, product]);
}, []);
```

### Lazy Loading Example
```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Measuring Performance

1. **Open DevTools Console**
   - See render logs for each component
   - Track when memoization prevents re-renders

2. **React DevTools Profiler**
   - Install React DevTools extension
   - Record interactions
   - Analyze flame graphs

3. **Performance Metrics**
   - Render count displayed in app
   - Last render time shown
   - Compare optimized vs unoptimized

## Optimization Checklist

- [x] Memoize expensive calculations with useMemo
- [x] Wrap event handlers in useCallback
- [x] Use React.memo for pure components
- [x] Implement lazy loading for heavy components
- [x] Debounce expensive operations
- [x] Monitor performance with Profiler
- [x] Optimize bundle size with code splitting
- [x] Use stable keys for lists

## Best Practices

1. **Only optimize when needed** - Measure first, optimize second
2. **Keep dependencies accurate** - Incorrect dependencies cause bugs
3. **Don't over-memoize** - Simple operations don't need memoization
4. **Profile in production mode** - Dev mode has overhead
5. **Consider bundle size** - Lazy load heavy dependencies

## Performance Tips

- Use production build for accurate measurements
- Profile on realistic hardware (don't just test on powerful machines)
- Consider network conditions for API calls
- Test with large datasets (1000+ items)
- Monitor memory usage for memory leaks

## Learn More

- [React Performance Docs](https://react.dev/learn/render-and-commit)
- [useMemo Hook](https://react.dev/reference/react/useMemo)
- [useCallback Hook](https://react.dev/reference/react/useCallback)
- [React.memo API](https://react.dev/reference/react/memo)
- [Code Splitting](https://react.dev/learn/code-splitting)
