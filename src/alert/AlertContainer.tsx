import { type FC } from "react";
import { useAlert } from "./AlertContext";
import type { AlertType } from "./types";

interface AlertContainerProps {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  className?: string;
}

const getAlertStyles = (type: AlertType) => {
  const baseStyles = {
    padding: "12px 16px",
    borderRadius: "6px",
    marginBottom: "8px",
    border: "1px solid",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minWidth: "300px",
    maxWidth: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  switch (type) {
    case "success":
      return {
        ...baseStyles,
        backgroundColor: "#d4edda",
        borderColor: "#c3e6cb",
        color: "#155724",
      };
    case "error":
      return {
        ...baseStyles,
        backgroundColor: "#f8d7da",
        borderColor: "#f5c6cb",
        color: "#721c24",
      };
    case "warning":
      return {
        ...baseStyles,
        backgroundColor: "#fff3cd",
        borderColor: "#ffeaa7",
        color: "#856404",
      };
    case "info":
      return {
        ...baseStyles,
        backgroundColor: "#d1ecf1",
        borderColor: "#bee5eb",
        color: "#0c5460",
      };
    default:
      return baseStyles;
  }
};

const getContainerStyles = (position: string) => {
  const baseStyles = {
    position: "fixed" as const,
    zIndex: 9999,
    padding: "16px",
    pointerEvents: "none" as const,
  };

  switch (position) {
    case "top-right":
      return { ...baseStyles, top: 0, right: 0 };
    case "top-left":
      return { ...baseStyles, top: 0, left: 0 };
    case "bottom-right":
      return { ...baseStyles, bottom: 0, right: 0 };
    case "bottom-left":
      return { ...baseStyles, bottom: 0, left: 0 };
    case "top-center":
      return {
        ...baseStyles,
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "bottom-center":
      return {
        ...baseStyles,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
      };
    default:
      return { ...baseStyles, top: 0, right: 0 };
  }
};

export const AlertContainer: FC<AlertContainerProps> = ({
  position = "top-right",
  className = "",
}) => {
  const { alerts, dismissAlert } = useAlert();

  const containerStyles = getContainerStyles(position);

  return (
    <div style={containerStyles} className={className}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            ...getAlertStyles(alert.type),
            pointerEvents: "auto",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {alert.title}
            </div>
            {alert.message && (
              <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
                {alert.message}
              </div>
            )}
          </div>
          {alert.dismissible && (
            <button
              onClick={() => dismissAlert(alert.id)}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                marginLeft: "12px",
                color: "inherit",
                opacity: 0.7,
              }}
              aria-label="Dismiss alert"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};
