import React from "react";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextFieldProps } from "@mui/material/TextField";

interface TimePickerProps {
  label?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => (
  <MuiTimePicker
    label={label}
    value={value}
    onChange={onChange}
    disabled={disabled}
    slotProps={{ textField: { fullWidth: true } as TextFieldProps }}
  />
);

export default TimePicker;
