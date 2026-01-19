import { ref, watchEffect, Ref } from 'vue';

type Validator<T> = (value: T) => string | null;

export function useValidation<T>(value: Ref<T>, validators: Validator<T>[]) {
  const error = ref<string | null>(null);
  const isValid = ref(true);

  watchEffect(() => {
    for (const validator of validators) {
      const err = validator(value.value);
      if (err) {
        error.value = err;
        isValid.value = false;
        return;
      }
    }
    error.value = null;
    isValid.value = true;
  });

  return { error, isValid };
}
