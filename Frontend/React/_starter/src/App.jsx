// React Starter Template
// Start building your React application here!

import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="header">
        <h1>React Starter Template</h1>
        <p>Start building your amazing React app!</p>
      </header>

      <main className="main">
        <div className="card">
          <h2>Counter Example</h2>
          <div className="counter">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span className="count">{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <button onClick={() => setCount(0)} className="reset">Reset</button>
        </div>

        <div className="card">
          <h2>Quick Start</h2>
          <ol>
            <li>Edit <code>src/App.jsx</code> to change this content</li>
            <li>Add your components in the <code>src/</code> folder</li>
            <li>Style your app in <code>src/styles.css</code></li>
            <li>Build something amazing!</li>
          </ol>
        </div>

        <div className="card">
          <h2>Resources</h2>
          <ul className="links">
            <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Documentation</a></li>
            <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite Documentation</a></li>
            <li><a href="https://react-router.com" target="_blank" rel="noopener noreferrer">React Router</a></li>
          </ul>
        </div>
      </main>

      <footer className="footer">
        <p>Built with React + Vite</p>
      </footer>
    </div>
  )
}

export default App
