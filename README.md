# @khuniverse/sso-coreui

A comprehensive React UI library with authentication, form handling, and API integration.

## Features

- 🔐 Authentication with JWT
- 📝 Form handling with validation
- 🔄 API integration with caching
- 🚀 TypeScript support
- 📱 Responsive design
- 🎨 Material UI components
- 📊 Data visualization
- 📅 Date and time pickers
- 📋 Data grids
- 🌳 Tree views

## Installation

```bash
npm install @khuniverse/sso-coreui
# or
yarn add @khuniverse/sso-coreui
```

## Usage

### Authentication

```typescript
import { useAuth, AlertProvider } from '@khuniverse/sso-coreui';

function App() {
  return (
    <AlertProvider>
      <YourApp />
    </AlertProvider>
  );
}

function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const { showError } = useAlert();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      showError('Login failed');
    }
  };

  return (
    // Your login form
  );
}
```

### Form Handling

```typescript
import { useForm } from '@khuniverse/sso-coreui';

function UserForm() {
  const { values, errors, handleChange, validateForm } = useForm({
    name: '',
    email: '',
  }, {
    name: {
      required: true,
      minLength: 3,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateForm()) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <div>{errors.name}</div>}

      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <div>{errors.email}</div>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

### API Integration

```typescript
import { useFetch } from '@khuniverse/sso-coreui';

function UserList() {
  const { data, loading, error, fetchData } = useFetch<User[]>();

  useEffect(() => {
    fetchData('/users', { cacheTime: 300000 }); // Cache for 5 minutes
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## API Reference

### Hooks

#### useAuth

```typescript
const {
  user,
  isAuthenticated,
  login,
  logout,
  refreshToken,
  hasRole,
  hasAnyRole,
  hasPermission,
  hasAnyPermission,
} = useAuth();
```

#### useForm

```typescript
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldError,
  resetForm,
  validateForm,
  setValues,
  setErrors,
  setTouched,
} = useForm(initialValues, validationRules);
```

#### useFetch

```typescript
const { data, loading, error, fetchData, reset, refetch } = useFetch<T>();
```

### Contexts

#### AlertProvider

```typescript
const { showSuccess, showError, showWarning, showInfo } = useAlert();
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [KH Universe](https://github.com/khuniverse)
