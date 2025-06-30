import { useCallback, useState } from 'react';
import { validate, ValidatorFn } from '../utils/validation';

export function useValidation(
  values: Record<string, any>,
  schema: Record<string, ValidatorFn[]>
) {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const runValidation = useCallback(() => {
    const errs = validate(values, schema);
    setErrors(errs);
    return errs;
  }, [values, schema]);

  return { errors, validate: runValidation };
} 