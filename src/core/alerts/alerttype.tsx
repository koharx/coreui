type AlertType = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

export default AlertType;
