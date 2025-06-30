export type ValidatorFn = (value: any, values?: Record<string, any>) => string | undefined;

export function validate(
  values: Record<string, any>,
  schema: Record<string, ValidatorFn[]>
): Record<string, string | undefined> {
  const errors: Record<string, string | undefined> = {};
  for (const key in schema) {
    const validators = schema[key];
    for (const validator of validators) {
      const error = validator(values[key], values);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  }
  return errors;
}

export const required: ValidatorFn = (value) =>
  value == null || value === '' ? 'Required' : undefined;

export const minLength = (min: number): ValidatorFn => (value) =>
  typeof value === 'string' && value.length < min
    ? `Must be at least ${min} characters`
    : undefined; 