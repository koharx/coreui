export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
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
  get: <T = any>(url: string, config?: any) => Promise<ApiResponse<T>>;
  post: <T = any>(url: string, data?: any, config?: any) => Promise<ApiResponse<T>>;
  put: <T = any>(url: string, data?: any, config?: any) => Promise<ApiResponse<T>>;
  patch: <T = any>(url: string, data?: any, config?: any) => Promise<ApiResponse<T>>;
  delete: <T = any>(url: string, config?: any) => Promise<ApiResponse<T>>;
} 