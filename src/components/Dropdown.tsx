import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  fullWidth = false,
  disabled = false,
}) => (
  <FormControl fullWidth={fullWidth} disabled={disabled}>
    {label && <InputLabel>{label}</InputLabel>}
    <Select value={value} onChange={onChange} label={label}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default Dropdown;
