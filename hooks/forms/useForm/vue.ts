import { reactive, toRaw } from 'vue';

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const values = reactive({ ...initialValues });
  const errors = reactive<Record<string, string>>({});

  const reset = () => {
    Object.assign(values, initialValues);
    Object.keys(errors).forEach(k => delete errors[k]);
  };

  const handleSubmit = (fn: (vals: T) => void) => {
    return (e?: Event) => {
      e?.preventDefault();
      fn(toRaw(values) as T);
    };
  };

  return { values, errors, reset, handleSubmit };
}
