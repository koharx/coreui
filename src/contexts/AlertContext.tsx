import React, { createContext, useContext, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logInfo, logError } from "../utils/logger";

interface AlertContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showSuccess = useCallback((message: string) => {
    toast.success(message);
    logInfo("Success Alert", { message });
  }, []);

  const showError = useCallback((message: string) => {
    toast.error(message);
    logError(new Error(message), "Error Alert");
  }, []);

  const showWarning = useCallback((message: string) => {
    toast.warning(message);
    logInfo("Warning Alert", { message });
  }, []);

  const showInfo = useCallback((message: string) => {
    toast.info(message);
    logInfo("Info Alert", { message });
  }, []);

  return (
    <AlertContext.Provider
      value={{ showSuccess, showError, showWarning, showInfo }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
