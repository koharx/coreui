import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
  type FC,
} from "react";
import { ApiClient } from "./apiClient";
import type { ApiContextType, ApiConfig } from "./types";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
  config: ApiConfig;
}

export const ApiProvider: FC<ApiProviderProps> = ({ children, config }) => {
  const apiClient = new ApiClient(config);

  const get = useCallback(
    async <T = any,>(url: string, requestConfig?: any) => {
      return apiClient.get<T>(url, requestConfig);
    },
    [apiClient]
  );

  const post = useCallback(
    async <T = any,>(url: string, data?: any, requestConfig?: any) => {
      return apiClient.post<T>(url, data, requestConfig);
    },
    [apiClient]
  );

  const put = useCallback(
    async <T = any,>(url: string, data?: any, requestConfig?: any) => {
      return apiClient.put<T>(url, data, requestConfig);
    },
    [apiClient]
  );

  const patch = useCallback(
    async <T = any,>(url: string, data?: any, requestConfig?: any) => {
      return apiClient.patch<T>(url, data, requestConfig);
    },
    [apiClient]
  );

  const deleteRequest = useCallback(
    async <T = any,>(url: string, requestConfig?: any) => {
      return apiClient.delete<T>(url, requestConfig);
    },
    [apiClient]
  );

  return (
    <ApiContext.Provider
      value={{
        get,
        post,
        put,
        patch,
        delete: deleteRequest,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
