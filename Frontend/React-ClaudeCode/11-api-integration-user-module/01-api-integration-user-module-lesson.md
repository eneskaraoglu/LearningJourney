# API Integration & User Module

## Building a Complete CRUD Application

This module covers building a full-featured user management system with Create, Read, Update, Delete operations.

## RESTful API Basics

### HTTP Methods

- **GET**: Retrieve data
- **POST**: Create new data
- **PUT/PATCH**: Update existing data
- **DELETE**: Delete data

### API Endpoints Pattern

```
GET    /api/users      - List all users
GET    /api/users/:id  - Get single user
POST   /api/users      - Create user
PUT    /api/users/:id  - Update user
DELETE /api/users/:id  - Delete user
```

## Complete User Module Pattern

### 1. API Service Layer

Centralize API calls in a service file:

```jsx
// services/userService.js
const API_URL = 'https://jsonplaceholder.typicode.com';

export const userService = {
  async getAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id, userData) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  }
};
```

### 2. User List Component

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={() => handleDelete(user.id)}
        />
      ))}
    </div>
  );
}
```

### 3. User Form Component

```jsx
function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    user || { name: '', email: '', phone: '' }
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      if (user?.id) {
        await userService.updateUser(user.id, formData);
      } else {
        await userService.createUser(formData);
      }
      onSave();
    } catch (err) {
      alert('Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
```

### 4. Modal Component

```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
```

### 5. Complete User Manager

```jsx
function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>Add User</button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="user-grid">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => handleEdit(user)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
```

## Advanced Patterns

### Pagination

```jsx
function UserListWithPagination() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = async (pageNum) => {
    const response = await fetch(
      `${API_URL}/users?_page=${pageNum}&_limit=${pageSize}`
    );
    const data = await response.json();
    const total = response.headers.get('X-Total-Count');
    setUsers(data);
    setTotalPages(Math.ceil(total / pageSize));
  };

  return (
    <div>
      <UserList users={users} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
```

### Search and Filter

```jsx
function UserListWithSearch() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserList users={filteredUsers} />
    </div>
  );
}
```

### Optimistic Updates

```jsx
function UserListOptimistic() {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    // Optimistically update UI
    const previousUsers = users;
    setUsers(users.filter(u => u.id !== id));

    try {
      await userService.deleteUser(id);
    } catch (err) {
      // Rollback on error
      setUsers(previousUsers);
      alert('Failed to delete');
    }
  };

  const handleUpdate = async (id, updates) => {
    // Optimistically update UI
    const previousUsers = users;
    setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));

    try {
      await userService.updateUser(id, updates);
    } catch (err) {
      // Rollback on error
      setUsers(previousUsers);
      alert('Failed to update');
    }
  };

  return (/* ... */);
}
```

## Error Handling

### Global Error Handler

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```jsx
async function apiCall(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 401) {
        throw new Error('Unauthorized');
      } else if (response.status === 500) {
        throw new Error('Server error');
      }
      throw new Error(`HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - check your connection');
    }
    throw error;
  }
}
```

## Best Practices

1. **Separate concerns**: API layer, business logic, UI components
2. **Error handling**: Always handle errors gracefully
3. **Loading states**: Show feedback during async operations
4. **Validation**: Client-side and server-side
5. **Optimistic updates**: Improve perceived performance
6. **Pagination**: Handle large datasets efficiently
7. **Caching**: Store frequently accessed data
8. **Security**: Sanitize inputs, use HTTPS, handle auth tokens properly

## Summary

- **CRUD operations**: Complete create, read, update, delete flow
- **API service layer**: Centralize API calls
- **Form handling**: Validation, submission, error display
- **Modal patterns**: Edit and add flows
- **Advanced features**: Pagination, search, optimistic updates
- **Error handling**: Graceful degradation and user feedback

## Next Steps

Module 12 introduces React Query for powerful server state management with caching, background updates, and more.
