import { computed, reactive } from 'vue';

interface UseValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  isValid: boolean;
  handleChange: (name: keyof T, value: any) => void;
  validate: () => void;
  reset: () => void;
}

/**
 * A Vue composable for form validation
 * @param initialValues Initial form values
 * @param validationRules Validation rules for each field
 * @returns Form state and validation functions
 */
export function useValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | undefined>
): UseValidationReturn<T> {
  const values = reactive({ ...initialValues });
  const errors = reactive<Record<string, string>>({});

  const isValid = computed(() => Object.keys(errors).length === 0);

  const validate = (): { isValid: boolean; errors: Record<string, string> } => {
    // Clear previous errors
    Object.keys(errors).forEach(key => delete errors[key]);

    // Validate each field
    for (const fieldName in validationRules) {
      const validator = validationRules[fieldName];
      const value = (values as any)[fieldName];
      const error = validator(value);

      if (error) {
        (errors as any)[fieldName] = error;
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors: { ...errors } };
  };

  const handleChange = (name: keyof T, value: any) => {
    (values as any)[name] = value;

    // Clear error when user starts typing
    if ((errors as any)[name as string]) {
      delete (errors as any)[name as string];
    }
  };

  const reset = () => {
    // Reset values
    Object.keys(values).forEach(key => delete (values as any)[key]);
    Object.assign(values, { ...initialValues });

    // Clear errors
    Object.keys(errors).forEach(key => delete (errors as any)[key]);
  };

  return {
    values: values as T,
    errors,
    isValid: isValid.value,
    handleChange,
    validate,
    reset,
  };
}
