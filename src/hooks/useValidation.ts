import { useState, useCallback } from "react";

type ValidationRule<T> = (value: T[keyof T], values: T) => string | undefined;

type ValidationRules<T> = Partial<Record<keyof T, ValidationRule<T>[]>>;

export const useValidation = <T extends Record<string, unknown>>() => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = useCallback(
    (values: T, rules: ValidationRules<T>): boolean => {
      const newErrors: Partial<Record<keyof T, string>> = {};

      Object.keys(rules).forEach((key) => {
        const fieldKey = key as keyof T;
        const fieldRules = rules[fieldKey];
        const value = values[fieldKey];

        if (fieldRules) {
          for (const rule of fieldRules) {
            const error = rule(value, values);
            if (error) {
              newErrors[fieldKey] = error;
              break;
            }
          }
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    errors,
    validate,
    clearErrors,
    setError,
  };
}; 