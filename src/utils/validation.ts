export type ValidatorFn<T = unknown> = (value: T, values?: Record<string, unknown>) => string | undefined;

export const required = (value: unknown): string | undefined => {
  if (value === null || value === undefined || value === "") {
    return "This field is required";
  }
  return undefined;
};

export const email = (value: unknown): string | undefined => {
  if (value && typeof value === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
  }
  return undefined;
};

export const minLength = (min: number) => (value: unknown): string | undefined => {
  if (value && typeof value === "string" && value.length < min) {
    return `Must be at least ${min} characters long`;
  }
  return undefined;
};

export const maxLength = (max: number) => (value: unknown): string | undefined => {
  if (value && typeof value === "string" && value.length > max) {
    return `Must be no more than ${max} characters long`;
  }
  return undefined;
};

export const pattern = (regex: RegExp, message: string) => (value: unknown): string | undefined => {
  if (value && typeof value === "string" && !regex.test(value)) {
    return message;
  }
  return undefined;
};

export const validate = <T extends Record<string, unknown>>(
  values: T,
  schema: Record<keyof T, ValidatorFn[]>
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  Object.keys(schema).forEach((key) => {
    const fieldKey = key as keyof T;
    const validators = schema[fieldKey];
    const value = values[fieldKey];

    for (const validator of validators) {
      const error = validator(value, values);
      if (error) {
        errors[fieldKey] = error;
        break;
      }
    }
  });

  return errors;
}; 