import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLoading } from '../contexts/LoadingContext';
import { useI18n } from '../contexts/I18nContext';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class ApiClient {
  private instance: AxiosInstance;
  private auth: ReturnType<typeof useAuth> | null = null;
  private notification: ReturnType<typeof useNotification> | null = null;
  private loading: ReturnType<typeof useLoading> | null = null;
  private i18n: ReturnType<typeof useI18n> | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.auth?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // Handle token refresh
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await this.auth?.refreshToken();
            return this.instance(originalRequest);
          } catch (refreshError) {
            this.auth?.logout();
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        if (error.response) {
          const { status, data } = error.response;
          let message = this.i18n?.t('error.unknown') || 'An unknown error occurred';

          if (typeof data === 'object' && data !== null && 'message' in data) {
            message = (data as { message: string }).message;
          }

          switch (status) {
            case 400:
              this.notification?.showError(message || this.i18n?.t('error.badRequest') || 'Bad Request');
              break;
            case 401:
              this.notification?.showError(message || this.i18n?.t('error.unauthorized') || 'Unauthorized');
              break;
            case 403:
              this.notification?.showError(message || this.i18n?.t('error.forbidden') || 'Forbidden');
              break;
            case 404:
              this.notification?.showError(message || this.i18n?.t('error.notFound') || 'Not Found');
              break;
            case 500:
              this.notification?.showError(message || this.i18n?.t('error.server') || 'Server Error');
              break;
            default:
              this.notification?.showError(message);
          }
        } else if (error.request) {
          this.notification?.showError(this.i18n?.t('error.network') || 'Network Error');
        } else {
          this.notification?.showError(this.i18n?.t('error.unknown') || 'An unknown error occurred');
        }

        return Promise.reject(error);
      }
    );
  }

  public setContext(
    auth: ReturnType<typeof useAuth>,
    notification: ReturnType<typeof useNotification>,
    loading: ReturnType<typeof useLoading>,
    i18n: ReturnType<typeof useI18n>
  ) {
    this.auth = auth;
    this.notification = notification;
    this.loading = loading;
    this.i18n = i18n;
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.loading?.withLoading(this.instance.get(url, config).then((res) => res.data)) as Promise<T>;
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.loading?.withLoading(this.instance.post(url, data, config).then((res) => res.data)) as Promise<T>;
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.loading?.withLoading(this.instance.put(url, data, config).then((res) => res.data)) as Promise<T>;
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.loading?.withLoading(this.instance.patch(url, data, config).then((res) => res.data)) as Promise<T>;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.loading?.withLoading(this.instance.delete(url, config).then((res) => res.data)) as Promise<T>;
  }

  public async upload<T = any>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.loading?.withLoading(
      this.instance
        .post(url, formData, {
          ...config,
          headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = (progressEvent.loaded / progressEvent.total) * 100;
              onProgress(progress);
            }
          },
        })
        .then((res) => res.data)
    ) as Promise<T>;
  }
}

export const api = new ApiClient();

export const useApi = () => {
  const auth = useAuth();
  const notification = useNotification();
  const loading = useLoading();
  const i18n = useI18n();

  api.setContext(auth, notification, loading, i18n);

  return api;
}; 