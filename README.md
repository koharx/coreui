# @khuniverse/core-ui

A comprehensive React library providing authentication, API calling, logging, and alert functionality with TypeScript support.

## Features

- 🔐 **Authentication**: JWT-based authentication with role and permission management
- 🌐 **API Client**: Axios-based HTTP client with interceptors and error handling
- 📝 **Logging**: Configurable logging system with console and localStorage support
- 🚨 **Alerts**: Toast notifications with multiple types and positioning
- 🎣 **Utility Hooks**: LocalStorage, SessionStorage, Debounce, and Throttle hooks
- 📦 **TypeScript**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @khuniverse/core-ui
```

## Quick Start

```tsx
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
  useAlert
} from '@khuniverse/core-ui';

function App() {
  return (
    <LoggerProvider config={{ level: 'info', enableConsole: true }}>
      <AlertProvider maxAlerts={5} defaultDuration={5000}>
        <ApiProvider config={{ baseURL: 'https://api.example.com' }}>
          <AuthProvider>
            <MyApp />
            <AlertContainer position="top-right" />
          </AuthProvider>
        </ApiProvider>
      </AlertProvider>
    </LoggerProvider>
  );
}

function MyApp() {
  const { login, user, isAuthenticated } = useAuth();
  const { get, post } = useApi();
  const { info, error } = useLogger();
  const { showSuccess, showError } = useAlert();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      info('User logged in successfully');
      showSuccess('Login Successful', 'Welcome back!');
    } catch (err) {
      error('Login failed', err as Error);
      showError('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Alert System

### AlertProvider

Provides alert context for displaying toast notifications.

```tsx
import { AlertProvider } from '@khuniverse/core-ui';

<AlertProvider maxAlerts={5} defaultDuration={5000}>
  <YourApp />
</AlertProvider>
```

### useAlert Hook

```tsx
import { useAlert } from '@khuniverse/core-ui';

function MyComponent() {
  const { 
    showAlert, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo,
    dismissAlert,
    clearAlerts 
  } = useAlert();

  const handleSuccess = () => {
    showSuccess('Success!', 'Operation completed successfully');
  };

  const handleError = () => {
    showError('Error!', 'Something went wrong');
  };

  const handleWarning = () => {
    showWarning('Warning!', 'Please check your input');
  };

  const handleInfo = () => {
    showInfo('Info', 'Here is some information');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={handleInfo}>Show Info</button>
      <button onClick={clearAlerts}>Clear All</button>
    </div>
  );
}
```

### AlertContainer

Displays the alerts in the UI. You can position it anywhere in your app.

```tsx
import { AlertContainer } from '@khuniverse/core-ui';

// Position options: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
<AlertContainer position="top-right" />
```

### Alert Types

- **Success**: Green alerts for successful operations
- **Error**: Red alerts for errors and failures
- **Warning**: Yellow alerts for warnings
- **Info**: Blue alerts for informational messages

### Alert Options

```tsx
showSuccess('Title', 'Message', {
  duration: 3000, // Auto-dismiss after 3 seconds (0 = no auto-dismiss)
  dismissible: true, // Whether the alert can be manually dismissed
});
```

## License

MIT 