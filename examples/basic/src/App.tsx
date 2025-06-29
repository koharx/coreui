import React from 'react';
import {
  AuthProvider,
  ApiProvider,
  LoggerProvider,
  AlertProvider,
  AlertContainer,
  useAuth,
  useApi,
  useLogger,
  useAlert,
  useLocalStorage,
  useDebounce
} from '@koharx/core-ui';

// Mock API for demo purposes
const mockApi = {
  get: async (url: string) => {
    if (url === '/api/user') {
      return { data: { id: '1', name: 'John Doe', email: 'john@example.com' } };
    }
    throw new Error('Not found');
  },
  post: async (url: string, data: any) => {
    if (url === '/api/auth/login') {
      return { data: { token: 'mock-jwt-token' } };
    }
    throw new Error('Not found');
  }
};

function LoginForm() {
  const { login, isAuthenticated, user, isLoading, error } = useAuth();
  const { info, error: logError } = useLogger();
  const { showSuccess, showError } = useAlert();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      info('Login successful');
      showSuccess('Login Successful', 'Welcome back!');
    } catch (err) {
      logError('Login failed', err as Error);
      showError('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  if (isAuthenticated) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Welcome, {user?.name}!</h3>
        <p>Email: {user?.email}</p>
        <p>Roles: {user?.roles?.join(', ') || 'None'}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div style={{ marginBottom: '10px' }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

function ApiDemo() {
  const { get } = useApi();
  const { info, error } = useLogger();
  const { showSuccess, showError, showInfo } = useAlert();
  const [data, setData] = React.useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await get('/api/user');
      setData(response.data);
      info('Data fetched successfully', response.data);
      showSuccess('Data Fetched', 'User data retrieved successfully');
    } catch (err) {
      error('Failed to fetch data', err as Error);
      showError('Fetch Failed', 'Unable to retrieve user data');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3>API Demo</h3>
      <button onClick={fetchData}>Fetch User Data</button>
      {data && (
        <div style={{ marginTop: '10px' }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function AlertDemo() {
  const { showSuccess, showError, showWarning, showInfo, clearAlerts } = useAlert();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Alert Demo</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => showSuccess('Success!', 'Operation completed successfully')}
          style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
        >
          Success Alert
        </button>
        <button 
          onClick={() => showError('Error!', 'Something went wrong')}
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
        >
          Error Alert
        </button>
        <button 
          onClick={() => showWarning('Warning!', 'Please check your input')}
          style={{ backgroundColor: '#ffc107', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
        >
          Warning Alert
        </button>
        <button 
          onClick={() => showInfo('Info', 'Here is some information')}
          style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
        >
          Info Alert
        </button>
        <button 
          onClick={clearAlerts}
          style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

function StorageDemo() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Storage & Debounce Demo</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Search (debounced):
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <p>Debounced value: {debouncedSearchTerm}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <LoggerProvider config={{ level: 'info', enableConsole: true }}>
      <AlertProvider maxAlerts={5} defaultDuration={5000}>
        <ApiProvider config={{ baseURL: 'https://api.example.com' }}>
          <AuthProvider>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
              <h1>@koharx/core-ui Demo</h1>
              <LoginForm />
              <ApiDemo />
              <AlertDemo />
              <StorageDemo />
            </div>
            <AlertContainer position="top-right" />
          </AuthProvider>
        </ApiProvider>
      </AlertProvider>
    </LoggerProvider>
  );
}

export default App; 