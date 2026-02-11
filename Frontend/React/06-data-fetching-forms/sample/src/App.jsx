import React, { useState, useEffect } from 'react';

// User Card Component
function UserCard({ user, onViewPosts }) {
  return (
    <div className="card user-card">
      <div className="card-header">
        <h3>{user.name}</h3>
        <span className="badge">{user.username}</span>
      </div>
      <div className="card-body">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>
      <div className="card-footer">
        <button onClick={() => onViewPosts(user.id)} className="btn-primary">
          View Posts
        </button>
      </div>
    </div>
  );
}

// Post Card Component
function PostCard({ post, onDelete, onEdit }) {
  return (
    <div className="card post-card">
      <div className="card-body">
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </div>
      <div className="card-footer">
        <button onClick={() => onEdit(post)} className="btn-secondary">
          Edit
        </button>
        <button onClick={() => onDelete(post.id)} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

// Contact Form Component
function ContactForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          disabled={loading}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          disabled={loading}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? 'error' : ''}
          disabled={loading}
        />
        {errors.subject && <span className="error-message">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className={errors.message ? 'error' : ''}
          disabled={loading}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

// Search Component
function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search users by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {loading && <span className="search-loading">Searching...</span>}
    </div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// Edit Post Form
function EditPostForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...post, title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="edit-title">Title</label>
        <input
          type="text"
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-body">Body</label>
        <textarea
          id="edit-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          required
        />
      </div>

      <div className="modal-footer">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}

// Main App Component
function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
      setSelectedUserId(userId);
      setActiveTab('posts');
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchLoading(true);
    setTimeout(() => {
      if (query.trim() === '') {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter(user =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
      setSearchLoading(false);
    }, 300);
  };

  const handleContactSubmit = async (formData) => {
    try {
      setFormLoading(true);
      // Simulate API call
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      showNotification('Message sent successfully!', 'success');
      setShowContactForm(false);
    } catch (err) {
      showNotification('Failed to send message', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      });

      setPosts(prev => prev.filter(post => post.id !== postId));
      showNotification('Post deleted successfully!', 'success');
    } catch (err) {
      showNotification('Failed to delete post', 'error');
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleSavePost = async (updatedPost) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost)
      });

      setPosts(prev => prev.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      ));
      setEditingPost(null);
      showNotification('Post updated successfully!', 'success');
    } catch (err) {
      showNotification('Failed to update post', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading && users.length === 0) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="app">
        <div className="error-screen">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchUsers} className="btn-primary">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Data Fetching & Forms Demo</h1>
        <p>Complete example of API integration and form handling in React</p>
      </header>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <nav className="tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users ({filteredUsers.length})
        </button>
        <button
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
          disabled={!selectedUserId}
        >
          Posts ({posts.length})
        </button>
        <button
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'users' && (
          <div className="users-section">
            <SearchBar onSearch={handleSearch} loading={searchLoading} />

            <div className="cards-grid">
              {filteredUsers.length === 0 ? (
                <div className="empty-state">
                  <p>No users found</p>
                </div>
              ) : (
                filteredUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onViewPosts={fetchUserPosts}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-section">
            <div className="section-header">
              <h2>User Posts</h2>
              <button onClick={() => setActiveTab('users')} className="btn-secondary">
                Back to Users
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="empty-state">
                <p>No posts found</p>
              </div>
            ) : (
              <div className="posts-list">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                    onEdit={handleEditPost}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-section">
            <ContactForm onSubmit={handleContactSubmit} loading={formLoading} />
          </div>
        )}
      </main>

      <Modal
        isOpen={editingPost !== null}
        onClose={() => setEditingPost(null)}
        title="Edit Post"
      >
        {editingPost && (
          <EditPostForm
            post={editingPost}
            onSave={handleSavePost}
            onCancel={() => setEditingPost(null)}
          />
        )}
      </Modal>

      <footer className="app-footer">
        <p>Built with React + Vite | Data from JSONPlaceholder API</p>
      </footer>
    </div>
  );
}

export default App;
