import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  type ReactNode,
  type FC,
} from "react";
import { createApiClient } from "./apiClient";
import type { ApiConfig, ApiContextType } from "./types";
import type { AxiosRequestConfig } from "axios";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
  config: ApiConfig;
}

export const ApiProvider: FC<ApiProviderProps> = ({ children, config }) => {
  const apiClient = useMemo(() => createApiClient(config), [config]);

  const get = useCallback(
    <T = unknown,>(url: string, requestConfig?: AxiosRequestConfig) => {
      return apiClient.get<T>(url, requestConfig);
    },
    [apiClient]
  );

  const post = useCallback(
    <T = unknown,>(
      url: string,
      data?: unknown,
      requestConfig?: AxiosRequestConfig
    ) => {
      return apiClient.post<T>(url, data, requestConfig);
    },
    [apiClient]
  );

  const put = useCallback(
    <T = unknown,>(
      url: string,
      data?: unknown,
      requestConfig?: AxiosRequestConfig
    ) => {
      return apiClient.put<T>(url, data, requestConfig);
    },
    [apiClient]
  );

  const patch = useCallback(
    <T = unknown,>(
      url: string,
      data?: unknown,
      requestConfig?: AxiosRequestConfig
    ) => {
      return apiClient.patch<T>(url, data, requestConfig);
    },
    [apiClient]
  );

  const del = useCallback(
    <T = unknown,>(url: string, requestConfig?: AxiosRequestConfig) => {
      return apiClient.delete<T>(url, requestConfig);
    },
    [apiClient]
  );

  const value = useMemo(
    () => ({
      get,
      post,
      put,
      patch,
      delete: del,
    }),
    [get, post, put, patch, del]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
