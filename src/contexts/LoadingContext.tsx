import React, { createContext, useContext, useState, useCallback } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useI18n } from "./I18nContext";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const { t } = useI18n();

  const showLoading = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingCount((prev) => {
      const newCount = prev - 1;
      setIsLoading(newCount > 0);
      return newCount;
    });
  }, []);

  const withLoading = useCallback(
    async <T,>(promise: Promise<T>): Promise<T> => {
      showLoading();
      try {
        const result = await promise;
        return result;
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading]
  );

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showLoading,
        hideLoading,
        withLoading,
      }}
    >
      {children}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
