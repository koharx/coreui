import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type FC,
} from "react";
import type { Alert, AlertContextType, AlertProviderProps } from "./types";

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  maxAlerts = 5,
  defaultDuration = 5000,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const generateId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9);
  }, []);

  const showAlert = useCallback(
    (alert: Omit<Alert, "id" | "timestamp">) => {
      const id = generateId();
      const newAlert: Alert = {
        ...alert,
        id,
        timestamp: new Date(),
        duration: alert.duration ?? defaultDuration,
        dismissible: alert.dismissible ?? true,
      };

      setAlerts((prev) => {
        const updated = [...prev, newAlert];
        // Keep only the latest alerts up to maxAlerts
        return updated.slice(-maxAlerts);
      });

      return id;
    },
    [generateId, defaultDuration, maxAlerts]
  );

  const showSuccess = useCallback(
    (title: string, message?: string, options?: Partial<Alert>) => {
      return showAlert({
        type: "success",
        title,
        message: message || "",
        ...options,
      });
    },
    [showAlert]
  );

  const showError = useCallback(
    (title: string, message?: string, options?: Partial<Alert>) => {
      return showAlert({
        type: "error",
        title,
        message: message || "",
        ...options,
      });
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (title: string, message?: string, options?: Partial<Alert>) => {
      return showAlert({
        type: "warning",
        title,
        message: message || "",
        ...options,
      });
    },
    [showAlert]
  );

  const showInfo = useCallback(
    (title: string, message?: string, options?: Partial<Alert>) => {
      return showAlert({
        type: "info",
        title,
        message: message || "",
        ...options,
      });
    },
    [showAlert]
  );

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Auto-dismiss alerts with duration
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    alerts.forEach((alert) => {
      if (alert.duration && alert.duration > 0) {
        const timeout = setTimeout(() => {
          dismissAlert(alert.id);
        }, alert.duration);
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [alerts, dismissAlert]);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        dismissAlert,
        clearAlerts,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
