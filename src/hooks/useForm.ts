import { useState } from "react";

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({ initialValues, onSubmit }: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  };
} 