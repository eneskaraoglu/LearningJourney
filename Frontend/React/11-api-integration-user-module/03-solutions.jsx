/**
 * MODULE 11: API Integration & User Module - Solutions
 *
 * Complete solutions for all exercises with production-quality code.
 */

import { useState, useEffect } from 'react';

/* ============================================
   SOLUTION 1: API Service Layer
   ============================================ */

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

function Solution1() {
  const [result, setResult] = useState('');

  const testAPI = async () => {
    try {
      const users = await api.getUsers();
      setResult(`Successfully fetched ${users.length} users`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="solution">
      <h2>Solution 1: API Service Layer</h2>
      <button onClick={testAPI}>Test API Service</button>
      {result && <p className="result">{result}</p>}
      <div className="code-info">
        <p>API Service includes:</p>
        <ul>
          <li>Centralized error handling</li>
          <li>Network error detection</li>
          <li>JSON serialization</li>
          <li>All CRUD methods</li>
        </ul>
      </div>
    </div>
  );
}

/* ============================================
   SOLUTION 2: Fetch and Display Users
   ============================================ */

function Solution2() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="solution">
        <h2>Solution 2: Fetch and Display Users</h2>
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="solution">
        <h2>Solution 2: Fetch and Display Users</h2>
        <div className="error">Error: {error}</div>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="solution">
        <h2>Solution 2: Fetch and Display Users</h2>
        <div className="empty-state">No users found</div>
      </div>
    );
  }

  return (
    <div className="solution">
      <h2>Solution 2: Fetch and Display Users</h2>
      <div className="users-grid">
        {users.slice(0, 6).map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
      </div>
      <p className="info">Showing {Math.min(6, users.length)} of {users.length} users</p>
    </div>
  );
}

/* ============================================
   SOLUTION 3: Create User Form
   ============================================ */

function Solution3() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.phone && !/^[\d\s\-().+]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await api.createUser(formData);

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', website: '' });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="solution">
      <h2>Solution 3: Create User Form</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
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
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating...' : 'Create User'}
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">User created successfully!</div>}
      </form>
    </div>
  );
}

/* ============================================
   SOLUTION 4: Edit User Modal
   ============================================ */

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function Solution4() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setIsModalOpen(true);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await api.updateUser(selectedUser.id, formData);

      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
      );

      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="solution">
      <h2>Solution 4: Edit User Modal</h2>
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
            <button onClick={() => handleEdit(user)} className="btn-secondary">
              Edit
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit User"
      >
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="edit-name">Name</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-email">Email</label>
            <input
              type="email"
              id="edit-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-phone">Phone</label>
            <input
              type="tel"
              id="edit-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-website">Website</label>
            <input
              type="text"
              id="edit-website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================================
   SOLUTION 5: Delete User with Confirmation
   ============================================ */

function Solution5() {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      setError(null);

      await api.deleteUser(userToDelete.id);

      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setIsConfirmOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="solution">
      <h2>Solution 5: Delete User with Confirmation</h2>
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
            <button
              onClick={() => handleDeleteClick(user)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Deletion"
      >
        <div className="confirm-dialog">
          {userToDelete && (
            <>
              <p>Are you sure you want to delete this user?</p>
              <div className="user-details">
                <strong>{userToDelete.name}</strong>
                <p>{userToDelete.email}</p>
              </div>
              <p className="warning">This action cannot be undone.</p>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="btn-danger"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

/* ============================================
   SOLUTION 6: Search and Filter Users
   ============================================ */

function Solution6() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search)
    );
  });

  return (
    <div className="solution">
      <h2>Solution 6: Search and Filter Users</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="clear-search">
            Clear
          </button>
        )}
      </div>

      <p className="result-count">
        Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
        {searchTerm && ` matching "${searchTerm}"`}
      </p>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="users-grid">
          {filteredUsers.slice(0, 6).map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p className="username">@{user.username}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div className="empty-state">No users found matching your search.</div>
      )}
    </div>
  );
}

/* ============================================
   SOLUTION 7: Pagination
   ============================================ */

function Solution7() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="solution">
        <h2>Solution 7: Pagination</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="solution">
      <h2>Solution 7: Pagination</h2>

      <div className="users-list">
        {currentUsers.map((user) => (
          <div key={user.id} className="user-item">
            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="btn-secondary"
        >
          Previous
        </button>

        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="btn-secondary"
        >
          Next
        </button>
      </div>

      <p className="pagination-info">
        Page {currentPage} of {totalPages} (Showing {startIndex + 1}-
        {Math.min(endIndex, users.length)} of {users.length} users)
      </p>
    </div>
  );
}

/* ============================================
   SOLUTION 8: Complete User Management System
   ============================================ */

function Solution8() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const search = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search)
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreate = async (formData) => {
    try {
      const newUser = await api.createUser(formData);
      setUsers((prev) => [newUser, ...prev]);
      setIsCreateModalOpen(false);
      showNotification('User created successfully!');
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await api.updateUser(selectedUser.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
      );
      setIsEditModalOpen(false);
      showNotification('User updated successfully!');
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      showNotification('User deleted successfully!');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  if (loading) {
    return (
      <div className="solution">
        <h2>Solution 8: Complete User Management System</h2>
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="solution">
        <h2>Solution 8: Complete User Management System</h2>
        <div className="error">Error: {error}</div>
        <button onClick={fetchUsers} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="solution">
      <h2>Solution 8: Complete User Management System</h2>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="toolbar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search">
              Clear
            </button>
          )}
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary"
        >
          + Add User
        </button>
      </div>

      <p className="result-count">
        {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
      </p>

      <div className="users-table">
        {currentUsers.map((user) => (
          <div key={user.id} className="user-row">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="username">@{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
            <div className="user-actions">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsEditModalOpen(true);
                }}
                className="btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsDeleteModalOpen(true);
                }}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-secondary"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn-secondary"
          >
            Next
          </button>
        </div>
      )}

      <UserFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        title="Create New User"
      />

      <UserFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        title="Edit User"
        initialData={selectedUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        user={selectedUser}
      />
    </div>
  );
}

function UserFormModal({ isOpen, onClose, onSubmit, title, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        website: initialData.website || '',
      });
    } else {
      setFormData({ name: '', email: '', phone: '', website: '' });
    }
    setError(null);
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, user }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
      {user && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this user?</p>
          <div className="user-details">
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </div>
          <p className="warning">This action cannot be undone.</p>
          <div className="modal-actions">
            <button onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button onClick={handleConfirm} className="btn-danger" disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// Export all solutions
export default function Solutions() {
  return (
    <div className="solutions-container">
      <h1>Module 11: API Integration & User Module - Solutions</h1>
      <Solution1 />
      <Solution2 />
      <Solution3 />
      <Solution4 />
      <Solution5 />
      <Solution6 />
      <Solution7 />
      <Solution8 />
    </div>
  );
}
