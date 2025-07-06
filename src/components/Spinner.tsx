import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface SpinnerProps {
  size?: number;
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
  thickness?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "primary",
  thickness = 3.6,
}) => <CircularProgress size={size} color={color} thickness={thickness} />;

export default Spinner;
