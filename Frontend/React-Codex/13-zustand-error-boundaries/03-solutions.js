// Zustand and Error Boundaries - Exercise Solutions

import React from "react";
import { create } from "zustand";

/*
Exercise 1: Zustand Store
*/
const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 }))
}));

function Counter() {
  const { count, inc, dec } = useStore();
  return (
    <div>
      <button onClick={dec}>-</button>
      <span>{count}</span>
      <button onClick={inc}>+</button>
    </div>
  );
}


/*
Exercise 2: Error Boundary
*/
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

function Boom() {
  throw new Error("Crash");
}

function App() {
  return (
    <ErrorBoundary>
      <Boom />
    </ErrorBoundary>
  );
}
