import React from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm } from "../../hooks/useForm";

interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string | null;
  };
}

interface FormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => Promise<void>;
  submitButtonText?: string;
  loading?: boolean;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitButtonText = "Submit",
  loading = false,
}) => {
  const initialValues = fields.reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    {} as Record<string, string>
  );

  const validationRules = fields.reduce(
    (acc, field) => {
      if (field.validation) {
        acc[field.name] = {
          required: field.required,
          ...field.validation,
        };
      } else if (field.required) {
        acc[field.name] = { required: true };
      }
      return acc;
    },
    {} as Record<string, any>
  );

  const { values, errors, handleChange, validateForm, resetForm } = useForm(
    initialValues,
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      await onSubmit(values);
      resetForm();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.name}>
            <TextField
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type || "text"}
              value={values[field.name]}
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              required={field.required}
              disabled={loading}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              submitButtonText
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
