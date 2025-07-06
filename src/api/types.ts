import { AxiosRequestConfig } from 'axios';

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiContextType {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
} 