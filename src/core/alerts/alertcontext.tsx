import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";
import AlertContextType from "./alertcontexttype";
import AlertType from "./alerttype";

const AlertContext = createContext<AlertContextType | undefined>(undefined);
let showGlobalAlert = () => {};

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertType>({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = (message: string, severity: AlertType["severity"]) => {
    setAlert({ open: true, message, severity });
  };

  showGlobalAlert = showAlert;
  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

export function showAlertFromJS(message, severity = "info") {
  if (showGlobalAlert) {
    showGlobalAlert(message, severity);
  }
}
