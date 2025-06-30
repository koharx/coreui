import { AxiosRequestConfig } from 'axios';
import type { ApiConfig, ApiResponse } from './types';
export declare class ApiClient {
    private instance;
    private token;
    constructor(config: ApiConfig);
    private setupInterceptors;
    setToken(token: string | null): void;
    private transformResponse;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
}
export declare const createApiClient: (config: ApiConfig) => ApiClient;
