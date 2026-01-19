import { useState, ChangeEvent, FormEvent } from 'react';

export function useForm<T>(initialValues: T, onSubmit: (values: T) => void) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add validation logic here if needed
    onSubmit(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, reset };
}
