import { useState, useEffect } from 'react';

/**
 * API Service Layer
 * Handles all HTTP requests to the JSONPlaceholder API
 */
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  async getUsers() {
    return this.request('/users');
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(data) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

// Create API instance
const api = new ApiService('https://jsonplaceholder.typicode.com');

/**
 * Modal Component
 * Reusable modal dialog with backdrop
 */
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/**
 * User Form Component
 * Handles both create and edit operations
 */
function UserForm({ user, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\d\s\-().+]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.website && !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z]{2,})+$/.test(formData.website.replace(/^https?:\/\//, ''))) {
      newErrors.website = 'Please enter a valid website';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="John Doe"
          disabled={loading}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="john@example.com"
          disabled={loading}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
          placeholder="+1 (555) 123-4567"
          disabled={loading}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className={errors.website ? 'error' : ''}
          placeholder="example.com"
          disabled={loading}
        />
        {errors.website && <span className="error-message">{errors.website}</span>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (user ? 'Updating...' : 'Creating...') : (user ? 'Update User' : 'Create User')}
        </button>
      </div>
    </form>
  );
}

/**
 * Delete Confirmation Component
 */
function DeleteConfirmation({ user, onConfirm, onCancel, loading }) {
  return (
    <div className="delete-confirmation">
      <div className="warning-icon">⚠️</div>
      <p className="confirmation-text">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="user-details">
        <strong>{user.name}</strong>
        <p>{user.email}</p>
      </div>
      <div className="form-actions">
        <button onClick={onCancel} className="btn btn-secondary" disabled={loading}>
          Cancel
        </button>
        <button onClick={onConfirm} className="btn btn-danger" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete User'}
        </button>
      </div>
    </div>
  );
}

/**
 * User Card Component
 */
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-username">@{user.username}</p>
        <p className="user-email">{user.email}</p>
        <p className="user-phone">{user.phone}</p>
        {user.website && (
          <p className="user-website">
            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
          </p>
        )}
      </div>
      <div className="user-actions">
        <button onClick={() => onEdit(user)} className="btn btn-secondary" title="Edit user">
          Edit
        </button>
        <button onClick={() => onDelete(user)} className="btn btn-danger" title="Delete user">
          Delete
        </button>
      </div>
    </div>
  );
}

/**
 * Notification Component
 */
function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="notification-close">
        &times;
      </button>
    </div>
  );
}

/**
 * Main App Component
 * Complete User Management System
 */
export default function App() {
  // State management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    delete: false,
  });
  const [notification, setNotification] = useState(null);

  const usersPerPage = 6;

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when search term changes
  useEffect(() => {
    const filtered = users.filter((user) => {
      const search = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search) ||
        (user.phone && user.phone.toLowerCase().includes(search))
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, users]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message);
      showNotification('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Close notification
  const closeNotification = () => {
    setNotification(null);
  };

  // Open modal
  const openModal = (type, user = null) => {
    setSelectedUser(user);
    setModalState({ create: false, edit: false, delete: false, [type]: true });
  };

  // Close all modals
  const closeModal = () => {
    setModalState({ create: false, edit: false, delete: false });
    setSelectedUser(null);
  };

  // Create user
  const handleCreateUser = async (formData) => {
    try {
      setOperationLoading(true);
      const newUser = await api.createUser(formData);
      // Add ID and username for UI purposes
      const userWithExtras = {
        ...newUser,
        id: Date.now(),
        username: formData.name.toLowerCase().replace(/\s+/g, ''),
      };
      setUsers((prev) => [userWithExtras, ...prev]);
      closeModal();
      showNotification('User created successfully!', 'success');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setOperationLoading(false);
    }
  };

  // Update user
  const handleUpdateUser = async (formData) => {
    try {
      setOperationLoading(true);
      await api.updateUser(selectedUser.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
      );
      closeModal();
      showNotification('User updated successfully!', 'success');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setOperationLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    try {
      setOperationLoading(true);
      await api.deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      closeModal();
      showNotification('User deleted successfully!', 'success');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setOperationLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && users.length === 0) {
    return (
      <div className="app">
        <div className="container">
          <div className="error-container">
            <div className="error-icon">❌</div>
            <h2>Failed to Load Users</h2>
            <p>{error}</p>
            <button onClick={fetchUsers} className="btn btn-primary">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="container">
        <header className="app-header">
          <div>
            <h1>User Management System</h1>
            <p className="subtitle">Manage your users with full CRUD operations</p>
          </div>
        </header>

        <div className="toolbar">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, username, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          <button onClick={() => openModal('create')} className="btn btn-primary">
            + Add User
          </button>
        </div>

        <div className="stats">
          <p>
            Showing {currentUsers.length} of {filteredUsers.length} user
            {filteredUsers.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>No users found</h2>
            <p>
              {searchTerm
                ? 'Try adjusting your search term'
                : 'Get started by adding your first user'}
            </p>
            {!searchTerm && (
              <button onClick={() => openModal('create')} className="btn btn-primary">
                Add User
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="users-grid">
              {currentUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={openModal.bind(null, 'edit')}
                  onDelete={openModal.bind(null, 'delete')}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create User Modal */}
      <Modal isOpen={modalState.create} onClose={closeModal} title="Create New User">
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={closeModal}
          loading={operationLoading}
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={modalState.edit} onClose={closeModal} title="Edit User">
        <UserForm
          user={selectedUser}
          onSubmit={handleUpdateUser}
          onCancel={closeModal}
          loading={operationLoading}
        />
      </Modal>

      {/* Delete User Modal */}
      <Modal isOpen={modalState.delete} onClose={closeModal} title="Delete User">
        {selectedUser && (
          <DeleteConfirmation
            user={selectedUser}
            onConfirm={handleDeleteUser}
            onCancel={closeModal}
            loading={operationLoading}
          />
        )}
      </Modal>
    </div>
  );
}
