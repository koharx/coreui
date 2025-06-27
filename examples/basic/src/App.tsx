import React from "react";
import {
  AlertProvider,
  useAuth,
  useForm,
  useFetch,
} from "@khuniverse/sso-coreui";
import { Button, TextField, Container, Box, Typography } from "@mui/material";

const LoginForm = () => {
  const { login, isAuthenticated } = useAuth();
  const { showError } = useAlert();

  const { values, errors, handleChange, validateForm } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      password: {
        required: true,
        minLength: 6,
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      try {
        await login(values);
      } catch (error) {
        showError("Login failed. Please check your credentials.");
      }
    }
  };

  if (isAuthenticated) {
    return <UserDashboard />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={values.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { data, loading, error, fetchData } = useFetch<any[]>();

  React.useEffect(() => {
    fetchData("/api/user-data", { cacheTime: 300000 });
  }, [fetchData]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Button variant="outlined" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
      {data && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Data:
          </Typography>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

const App = () => {
  return (
    <AlertProvider>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            SSO CoreUI Example
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </AlertProvider>
  );
};

export default App;
