import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: any;
}

interface UseFormReturn<T = FormValues> {
  values: T;
  errors: FormErrors;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: FormEvent) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  resetForm: () => void;
  isValid: boolean;
}

/**
 * React hook for form management
 * @param initialValues Initial form values
 * @param validationSchema Validation function or schema
 * @param onSubmit Submit handler
 * @returns Form state and handlers
 */
export function useForm<T = FormValues>(
  initialValues: T,
  validationSchema?: (values: T) => FormErrors | Promise<FormErrors>,
  onSubmit?: (values: T) => void | Promise<void>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback(
    async (valuesToValidate: T): Promise<FormErrors> => {
      if (!validationSchema) return {};

      try {
        const result = await validationSchema(valuesToValidate);
        return result || {};
      } catch (error) {
        console.error('Validation error:', error);
        return {};
      }
    },
    [validationSchema]
  );

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      const { name, value, type } = target;
      const checked = (target as HTMLInputElement).checked;

      setValues(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));

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

  const handleBlur = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      const newErrors = await validate({ ...values, [name]: value } as T);

      setErrors(prev => {
        const newErrorObj = { ...prev };
        const errorValue = newErrors[name as string];
        if (errorValue) {
          newErrorObj[name as string] = errorValue;
        } else {
          delete newErrorObj[name as string];
        }
        return newErrorObj;
      });
    },
    [validate, values]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const newErrors = await validate(values);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && onSubmit) {
        await onSubmit(values);
      }
    },
    [validate, onSubmit, values]
  );

  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      setValues(prev => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when field value is set programmatically
      if (errors[field as string]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    isValid,
  };
}
