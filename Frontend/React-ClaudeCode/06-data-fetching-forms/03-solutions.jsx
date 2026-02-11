// Data Fetching & Forms - Solutions

import React, { useState, useEffect } from 'react';

// Exercise 1: Basic Fetch
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <br />
            <small>{user.company.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exercise 2: Fetch with useEffect Dependencies
function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return null;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>Post ID: {post.id}</small>
    </div>
  );
}

// Exercise 3: Controlled Form
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}

// Exercise 4: Form Validation
function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors(prev => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value && !validatePassword(value)) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    } else {
      setErrors(prev => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      alert('Please fix all errors before submitting');
      return;
    }

    console.log('Signup successful:', { email, password });
    alert('Account created successfully!');
  };

  const isFormValid = validateEmail(email) && validatePassword(password) && email && password;

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Create Account
      </button>
    </form>
  );
}

// Exercise 5: Dynamic Form
function TodoForm() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: todoText }]);
      setTodoText('');
    }
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-form">
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group inline">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter a todo..."
            required
          />
          <button type="submit">Add</button>
        </div>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty">No todos yet. Add one above!</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => handleDelete(todo.id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// Exercise 6: Async Form Submission
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      await response.json();
      setMessage({ type: 'success', text: 'Login successful!' });
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// Exercise 7: Search with Debounce
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Debounce implementation
    const timeoutId = setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          const filtered = users.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filtered);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="search-box">
      <h2>Search Users</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        className="search-input"
      />

      {loading && <div className="loading">Searching...</div>}

      {!loading && results.length > 0 && (
        <ul className="search-results">
          {results.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong>
              <br />
              <small>{user.email}</small>
            </li>
          ))}
        </ul>
      )}

      {!loading && query && results.length === 0 && (
        <div className="no-results">No users found</div>
      )}
    </div>
  );
}

// Exercise 8: File Upload Preview
function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="image-upload">
      <h2>Image Upload</h2>

      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          Choose Image
        </label>
      </div>

      {selectedFile && (
        <div className="file-info">
          <p><strong>File Name:</strong> {selectedFile.name}</p>
          <p><strong>File Size:</strong> {formatFileSize(selectedFile.size)}</p>
          <p><strong>File Type:</strong> {selectedFile.type}</p>
          <button onClick={handleClear} className="clear-btn">Clear</button>
        </div>
      )}

      {preview && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" />
        </div>
      )}
    </div>
  );
}

// Exercise 9: Multi-Step Form
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration complete!');
    // Reset
    setStep(1);
    setFormData({ name: '', email: '', street: '', city: '', zip: '' });
  };

  return (
    <div className="multi-step-form">
      <h2>Registration Form</h2>

      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h3>Step 1: Personal Information</h3>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="button" onClick={handleNext}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Step 2: Address</h3>
            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={handlePrevious}>Previous</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Step 3: Review & Submit</h3>
            <div className="review-section">
              <h4>Personal Information</h4>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>

              <h4>Address</h4>
              <p><strong>Street:</strong> {formData.street}</p>
              <p><strong>City:</strong> {formData.city}</p>
              <p><strong>ZIP:</strong> {formData.zip}</p>
            </div>
            <div className="button-group">
              <button type="button" onClick={handlePrevious}>Previous</button>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// Exercise 10: CRUD Operations
function PostManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });

    const data = await response.json();
    setPosts(prev => [{ ...data, id: Date.now() }, ...prev]);
    setNewPost({ title: '', body: '' });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    });

    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  };

  const handleUpdate = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, body: editBody })
    });

    await response.json();

    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, title: editTitle, body: editBody } : post
    ));

    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="post-manager">
      <div className="header">
        <h2>Post Manager</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Post'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="create-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Post body..."
              value={newPost.body}
              onChange={(e) => setNewPost(prev => ({ ...prev, body: e.target.value }))}
              rows="3"
              required
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      )}

      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            {editingId === post.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  rows="3"
                />
                <div className="button-group">
                  <button onClick={() => handleUpdate(post.id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="button-group">
                  <button onClick={() => handleEdit(post)}>Edit</button>
                  <button onClick={() => handleDelete(post.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  UserList,
  PostDetail,
  ContactForm,
  SignupForm,
  TodoForm,
  LoginForm,
  SearchBox,
  ImageUpload,
  MultiStepForm,
  PostManager
};
