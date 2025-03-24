import AlertType from "./alerttype";

type AlertContextType = {
  showAlert: (message: string, severity: AlertType["severity"]) => void;
};

export default AlertContextType;
