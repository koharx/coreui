import React from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextFieldProps } from "@mui/material/TextField";

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  format?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  format = "yyyy-MM-dd",
  disabled = false,
}) => (
  <MuiDatePicker
    label={label}
    value={value}
    onChange={onChange}
    format={format}
    disabled={disabled}
    slotProps={{ textField: { fullWidth: true } as TextFieldProps }}
  />
);

export default DatePicker;
