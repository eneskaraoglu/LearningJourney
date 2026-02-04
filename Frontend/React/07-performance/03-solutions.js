// Performance - Exercise Solutions

import React, { Suspense, lazy, useCallback, useMemo } from "react";

/*
Exercise 1: React.memo
*/
const Item = React.memo(function Item({ value }) {
  return <li>{value}</li>;
});


/*
Exercise 2: useMemo
*/
function Expensive({ n }) {
  const total = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < n * 10000; i += 1) sum += i;
    return sum;
  }, [n]);

  return <div>Total: {total}</div>;
}


/*
Exercise 3: useCallback
*/
function Button({ onClick }) {
  return <button onClick={onClick}>Save</button>;
}

function Container({ value }) {
  const handleClick = useCallback(() => {
    console.log(value);
  }, [value]);

  return <Button onClick={handleClick} />;
}


/*
Exercise 4: Lazy Loading
*/
const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Settings />
    </Suspense>
  );
}
