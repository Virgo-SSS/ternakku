# Frontend Rules (React/Vite)

## Component Structure

### Page Components (`/client/src/pages/`)
```jsx
// Standard page structure
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Swal from 'sweetalert2';

const ExamplePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get('/endpoint');
      setData(response.data.data);
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (/* JSX */);
};

export default ExamplePage;
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Page components | PascalCase + Page suffix | `CowPage.jsx`, `CreateWorkerPage.jsx` |
| Helper files | camelCase + Helper suffix | `cowHelper.js`, `dateHelper.js` |
| Hooks | camelCase + use prefix | `useAuth.jsx`, `useAxiosPrivate.jsx` |
| Context | PascalCase + Context | `AuthContext.jsx` |

## API Calls

### Always use `useAxiosPrivate` for authenticated endpoints
```jsx
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Component = () => {
  const axiosPrivate = useAxiosPrivate();
  // axiosPrivate automatically handles token refresh on 401
};
```

### Use public axios only for auth routes
```jsx
import { axiosPublic } from '../api/api';
// Only for /login, /register, /token
```

## User Notifications

### Use SweetAlert2 for all notifications
```jsx
import Swal from 'sweetalert2';

// Success
Swal.fire('Berhasil', 'Data berhasil disimpan', 'success');

// Error
Swal.fire('Error', error.response?.data?.message, 'error');

// Confirmation
const result = await Swal.fire({
  title: 'Hapus Data?',
  text: 'Data yang dihapus tidak dapat dikembalikan',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Ya, Hapus',
  cancelButtonText: 'Batal'
});
if (result.isConfirmed) { /* delete */ }
```

## Routing

### Protected routes wrap with RequireAuth
```jsx
<Route element={<RequireAuth />}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>
```

### Guest-only routes wrap with RequireGuest
```jsx
<Route element={<RequireGuest />}>
  <Route path="/auth/login" element={<LoginPage />} />
</Route>
```

## Styling

- Use Tailwind CSS utilities with `tw-` prefix for custom classes
- Bootstrap grid classes available: `col-md-*`, `col-lg-*`, `row`
- Primary color: `tw-primary` (#93A603)
- Base background: `tw-base` (#F5F5F9)

## Form Handling

```jsx
const [formData, setFormData] = useState({
  name: '',
  status: 1,
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axiosPrivate.post('/endpoint', formData);
    Swal.fire('Berhasil', 'Data tersimpan', 'success');
    navigate('/list');
  } catch (error) {
    Swal.fire('Error', error.response?.data?.message, 'error');
  }
};
```

## Helper Functions

### Status Labels (Indonesian)
```js
// cowHelper.js
export const getCowStatusLabel = (status) => {
  return status === 1 ? 'Sehat' : 'Tidak Sehat';
};

// taskHelper.js
export const getTaskPriorityLabel = (priority) => {
  const labels = { 1: 'Rendah', 2: 'Sedang', 3: 'Tinggi' };
  return labels[priority];
};
```
