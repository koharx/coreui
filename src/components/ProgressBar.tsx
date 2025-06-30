import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
  value?: number;
  variant?: "determinate" | "indeterminate" | "buffer" | "query";
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = "indeterminate",
  color = "primary",
}) => <LinearProgress value={value} variant={variant} color={color} />;

export default ProgressBar;
