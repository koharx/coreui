import React from "react";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";

interface ChipProps {
  label: React.ReactNode;
  color?: MuiChipProps["color"];
  onDelete?: MuiChipProps["onDelete"];
  variant?: MuiChipProps["variant"];
}

const Chip: React.FC<ChipProps> = ({
  label,
  color = "default",
  onDelete,
  variant = "filled",
}) => (
  <MuiChip label={label} color={color} onDelete={onDelete} variant={variant} />
);

export default Chip;
