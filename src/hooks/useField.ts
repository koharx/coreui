import { useState } from "react";

export function useField<T = string>(
  initialValue: T,
  validate?: (value: T) => string | undefined
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value as unknown as T;
    setValue(newValue);
    if (validate) {
      setError(validate(newValue));
    }
  };

  return {
    value,
    setValue,
    error,
    setError,
    onChange,
  };
} 