import { computed, Injectable, signal } from '@angular/core';

interface UseValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  isValid: boolean;
  handleChange: (name: keyof T, value: any) => void;
  validate: () => void;
  reset: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   * An Angular service for form validation
   * @param initialValues Initial form values
   * @param validationRules Validation rules for each field
   * @returns Form state and validation functions
   */
  useValidation<T extends Record<string, any>>(
    initialValues: T,
    validationRules: Record<keyof T, (value: any) => string | undefined>
  ): UseValidationReturn<T> {
    const valuesSignal = signal<T>({ ...initialValues });
    const errorsSignal = signal<Record<string, string>>({});
    const isValidSignal = computed(
      () => Object.keys(errorsSignal()).length === 0
    );

    const validate = () => {
      const newErrors: Record<string, string> = {};

      for (const fieldName in validationRules) {
        const validator = validationRules[fieldName];
        const value = valuesSignal()[fieldName];
        const error = validator(value);

        if (error) {
          newErrors[fieldName as string] = error;
        }
      }

      errorsSignal.set(newErrors);
      return {
        isValid: Object.keys(newErrors).length === 0,
        errors: { ...newErrors },
      };
    };

    const handleChange = (name: keyof T, value: any) => {
      const currentValues = valuesSignal();
      valuesSignal.set({
        ...currentValues,
        [name]: value,
      });

      // Clear error when user starts typing
      const currentErrors = errorsSignal();
      if (currentErrors[name as string]) {
        const newErrors = { ...currentErrors };
        delete newErrors[name as string];
        errorsSignal.set(newErrors);
      }
    };

    const reset = () => {
      valuesSignal.set(initialValues);
      errorsSignal.set({});
    };

    return {
      get values() {
        return valuesSignal();
      },
      get errors() {
        return errorsSignal();
      },
      get isValid() {
        return isValidSignal();
      },
      handleChange,
      validate,
      reset,
    };
  }
}

// Standalone hook function for use outside of DI
export function useValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | undefined>
) {
  const service = new ValidationService();
  return service.useValidation(initialValues, validationRules);
}
