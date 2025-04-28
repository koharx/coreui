import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { logInfo, logError } from "../utils/logger";

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const decoded = jwtDecode<{
        sub: string;
        email: string;
        name: string;
        roles: string[];
        permissions: string[];
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
      localStorage.removeItem("token");
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post("/api/auth/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);
      const decoded = jwtDecode<{
        sub: string;
        email: string;
        name: string;
        roles: string[];
        permissions: string[];
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
      logInfo("User logged in", { userId: decoded.sub });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    logInfo("User logged out");
    navigate("/login");
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post("/api/auth/refresh");
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<{
        sub: string;
        email: string;
        name: string;
        roles: string[];
        permissions: string[];
      }>(token);

      setState((prev) => ({
        ...prev,
        user: {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          roles: decoded.roles || [],
          permissions: decoded.permissions || [],
        },
        token,
      }));
    } catch (error) {
      logout();
    }
  };

  const hasRole = (role: string) => {
    return state.user?.roles.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]) => {
    return state.user?.roles.some((role) => roles.includes(role)) || false;
  };

  const hasPermission = (permission: string) => {
    return state.user?.permissions.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: string[]) => {
    return (
      state.user?.permissions.some((permission) =>
        permissions.includes(permission)
      ) || false
    );
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshToken,
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission,
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
