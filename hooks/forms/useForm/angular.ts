import { computed, Injectable, signal } from '@angular/core';

interface FormErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: any;
}

interface UseFormReturn<T = FormValues> {
  values: T;
  errors: FormErrors;
  handleChange: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleSubmit: (e: Event) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  resetForm: () => void;
  isValid: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  /**
   * Angular service for form management
   * @param initialValues Initial form values
   * @param validationSchema Validation function or schema
   * @param onSubmit Submit handler
   * @returns Form state and handlers
   */
  useForm<T = FormValues>(
    initialValues: T,
    validationSchema?: (values: T) => FormErrors | Promise<FormErrors>,
    onSubmit?: (values: T) => void | Promise<void>
  ): UseFormReturn<T> {
    const valuesSignal = signal<T>(initialValues);
    const errorsSignal = signal<FormErrors>({});

    const validate = async (valuesToValidate: T): Promise<FormErrors> => {
      if (!validationSchema) return {};

      try {
        const result = await validationSchema(valuesToValidate);
        return result || {};
      } catch (error) {
        console.error('Validation error:', error);
        return {};
      }
    };

    const handleChange = (e: Event) => {
      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      const { name, value } = target;
      const checked = (target as HTMLInputElement).checked;
      const type = target.type;

      const currentValues = valuesSignal();
      valuesSignal.set({
        ...currentValues,
        [name]: type === 'checkbox' ? checked : value,
      });

      // Clear error when user starts typing
      const currentErrors = errorsSignal();
      if (currentErrors[name]) {
        const newErrors = { ...currentErrors };
        delete newErrors[name];
        errorsSignal.set(newErrors);
      }
    };

    const handleBlur = async (e: Event) => {
      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      const { name, value } = target;

      const currentValues = valuesSignal();
      const newErrors = await validate({
        ...currentValues,
        [name]: value,
      } as T);

      const currentErrors = errorsSignal();
      const updatedErrors = { ...currentErrors };
      if (newErrors[name]) {
        updatedErrors[name] = newErrors[name];
      } else {
        delete updatedErrors[name];
      }
      errorsSignal.set(updatedErrors);
    };

    const handleSubmit = async (e: Event) => {
      e.preventDefault();

      const currentValues = valuesSignal();
      const newErrors = await validate(currentValues);
      errorsSignal.set(newErrors);

      if (Object.keys(newErrors).length === 0 && onSubmit) {
        await onSubmit(currentValues);
      }
    };

    const setFieldValue = (field: keyof T, value: any) => {
      const currentValues = valuesSignal();
      valuesSignal.set({
        ...currentValues,
        [field]: value,
      });

      // Clear error when field value is set programmatically
      const currentErrors = errorsSignal();
      if (currentErrors[field as string]) {
        const newErrors = { ...currentErrors };
        delete newErrors[field as string];
        errorsSignal.set(newErrors);
      }
    };

    const setFieldError = (field: keyof T, error: string) => {
      const currentErrors = errorsSignal();
      errorsSignal.set({
        ...currentErrors,
        [field as string]: error,
      });
    };

    const resetForm = () => {
      valuesSignal.set(initialValues);
      errorsSignal.set({});
    };

    const isValid = computed(() => Object.keys(errorsSignal()).length === 0);

    return {
      values: valuesSignal(),
      errors: errorsSignal(),
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setFieldError,
      resetForm,
      isValid: isValid(),
    };
  }
}

// Standalone hook function for use outside of DI
export function useForm<T = FormValues>(
  initialValues: T,
  validationSchema?: (values: T) => FormErrors | Promise<FormErrors>,
  onSubmit?: (values: T) => void | Promise<void>
) {
  const service = new FormService();
  return service.useForm(initialValues, validationSchema, onSubmit);
}
