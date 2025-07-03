import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type FC,
} from "react";
import { jwtDecode } from "jwt-decode";
import type {
  User,
  AuthState,
  LoginCredentials,
  AuthContextType,
} from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  apiClient?: any; // Will be properly typed when we create the API client
}

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  apiClient,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const decoded = jwtDecode<{
        sub: string;
        email: string;
        name: string;
        roles?: string[];
        permissions?: string[];
      }>(token);

      setState({
        user: {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          roles: decoded.roles || [],
          permissions: decoded.permissions || [],
        },
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      localStorage.removeItem("auth_token");
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid token",
      }));
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        let response, data;
        if (apiClient) {
          // Assume apiClient returns { data: { token: ... } }
          response = await apiClient.post("/api/auth/login", credentials);
          data = response.data;
        } else {
          response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          if (!response.ok) throw new Error("Login failed");
          data = await response.json();
        }

        const { accessToken } = data;
        localStorage.setItem("auth_token", accessToken);

        // ...rest of your logic
      } catch (error) {
        // ...error handling
      }
    },
    [apiClient]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      let response, data;
      if (apiClient) {
        response = await apiClient.post("/api/auth/refresh");
        data = response.data;
      } else {
        response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Token refresh failed");
        data = await response.json();
      }

      const { token } = data;
      localStorage.setItem("auth_token", token);

      // ...rest of your logic
    } catch (error) {
      // ...error handling
    }
  }, [apiClient]);

  const hasRole = useCallback(
    (role: string) => {
      return state.user?.roles?.includes(role) || false;
    },
    [state.user]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      return state.user?.permissions?.includes(permission) || false;
    },
    [state.user]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshToken,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
