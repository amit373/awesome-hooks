import { ref } from 'vue';

interface FormErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: any;
}

import { Ref } from 'vue';

interface UseFormReturn<T = FormValues> {
  values: Ref<T>;
  errors: Ref<FormErrors>;
  handleChange: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleSubmit: (e: Event) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  resetForm: () => void;
  isValid: boolean;
}

/**
 * Vue composable for form management
 * @param initialValues Initial form values
 * @param validationSchema Validation function or schema
 * @param onSubmit Submit handler
 * @returns Form state and handlers
 */
export function useForm<T extends Record<string, any> = FormValues>(
  initialValues: T,
  validationSchema?: (values: T) => FormErrors | Promise<FormErrors>,
  onSubmit?: (values: T) => void | Promise<void>
): UseFormReturn<T> {
  const values = ref<T>({ ...initialValues });
  const errors = ref<FormErrors>({});

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

    (values.value as any)[name] = type === 'checkbox' ? checked : value;

    // Clear error when user starts typing
    if (errors.value[name]) {
      delete errors.value[name];
    }
  };

  const handleBlur = async (e: Event) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { name, value } = target;

    const newErrors = await validate({ ...values.value, [name]: value } as T);

    if (newErrors[name]) {
      errors.value[name] = newErrors[name];
    } else {
      delete errors.value[name];
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const newErrors = await validate(values.value as T);

    // Clear previous errors and set new ones
    Object.keys(errors.value).forEach(key => delete errors.value[key]);
    Object.assign(errors.value, newErrors);

    if (Object.keys(newErrors).length === 0 && onSubmit) {
      await onSubmit(values.value as T);
    }
  };

  const setFieldValue = (field: keyof T, value: any) => {
    (values.value as any)[field] = value;

    // Clear error when field value is set programmatically
    if (errors.value[field as string]) {
      delete errors.value[field as string];
    }
  };

  const setFieldError = (field: keyof T, error: string) => {
    errors.value[field as string] = error;
  };

  const resetForm = () => {
    // Reset values
    Object.keys(values.value).forEach(key => {
      delete (values.value as any)[key];
    });
    Object.assign(values.value, { ...initialValues });

    // Reset errors
    Object.keys(errors.value).forEach(key => {
      delete errors.value[key];
    });
  };

  return {
    values: values as Ref<T>,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    isValid: Object.keys(errors.value).length === 0,
  };
}
