import { useCallback, useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface UseValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  isValid: boolean;
  handleChange: (name: keyof T, value: any) => void;
  validate: () => void;
  reset: () => void;
}

/**
 * A React hook for form validation
 * @param initialValues Initial form values
 * @param validationRules Validation rules for each field
 * @returns Form state and validation functions
 */
export function useValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | undefined>
): UseValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((): ValidationResult => {
    const newErrors: Record<string, string> = {};

    for (const fieldName in validationRules) {
      const validator = validationRules[fieldName];
      const value = values[fieldName];
      const error = validator(value);

      if (error) {
        newErrors[fieldName as string] = error;
      }
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  }, [values, validationRules]);

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setValues(prev => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name as string]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
    handleChange,
    validate,
    reset,
  };
}
