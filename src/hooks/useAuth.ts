import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import axiosInstance from '../utils/axios';
import { logError, logInfo } from '../utils/logger';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useAuth = () => {
  const { user, isAuthenticated, login: contextLogin, logout: contextLogout } = useAuthContext();
  const { showSuccess, showError } = useAlert();
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  const [state, setState] = useState<AuthState>({
    user,
    isAuthenticated,
    isLoading: false,
    error: null,
  });

  const clearRefreshTimeout = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, []);

  const scheduleTokenRefresh = useCallback((expiresIn: number) => {
    clearRefreshTimeout();
    // Refresh token 5 minutes before it expires
    const refreshTime = (expiresIn - 300) * 1000;
    refreshTimeoutRef.current = setTimeout(() => {
      refreshToken();
    }, refreshTime);
  }, [clearRefreshTimeout]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev: AuthState) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await axiosInstance.post<{ token: string; expiresIn: number }>('/auth/login', credentials);
      const { token, expiresIn } = response.data;
      
      contextLogin(token, expiresIn.toString());
      scheduleTokenRefresh(expiresIn);
      
      setState((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: true,
      }));
      
      showSuccess('Login successful');
      logInfo('User logged in', { email: credentials.email });
    } catch (error) {
      const err = error as Error;
      logError(err, 'Login Error');
      showError('Login failed. Please check your credentials.');
      
      setState((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        error: err,
      }));
      
      throw error;
    }
  }, [contextLogin, showSuccess, showError, scheduleTokenRefresh]);

  const logout = useCallback(() => {
    try {
      clearRefreshTimeout();
      contextLogout();
      
      setState((prev: AuthState) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
      }));
      
      showSuccess('Logged out successfully');
      logInfo('User logged out');
    } catch (error) {
      const err = error as Error;
      logError(err, 'Logout Error');
      showError('Logout failed');
      
      setState((prev: AuthState) => ({
        ...prev,
        error: err,
      }));
      
      throw error;
    }
  }, [contextLogout, showSuccess, showError, clearRefreshTimeout]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post<{ token: string; expiresIn: number }>('/auth/refresh');
      const { token, expiresIn } = response.data;
      
      contextLogin(token, expiresIn.toString());
      scheduleTokenRefresh(expiresIn);
      
      logInfo('Token refreshed successfully');
    } catch (error) {
      const err = error as Error;
      logError(err, 'Token Refresh Error');
      contextLogout();
      throw error;
    }
  }, [contextLogin, contextLogout, scheduleTokenRefresh]);

  const hasRole = useCallback((role: string) => {
    return user?.roles?.includes(role) || false;
  }, [user]);

  const hasAnyRole = useCallback((roles: string[]) => {
    return roles.some(role => user?.roles?.includes(role)) || false;
  }, [user]);

  const hasPermission = useCallback((permission: string) => {
    return user?.permissions?.includes(permission) || false;
  }, [user]);

  const hasAnyPermission = useCallback((permissions: string[]) => {
    return permissions.some(permission => user?.permissions?.includes(permission)) || false;
  }, [user]);

  useEffect(() => {
    return () => {
      clearRefreshTimeout();
    };
  }, [clearRefreshTimeout]);

  return {
    ...state,
    login,
    logout,
    refreshToken,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
  };
}; 