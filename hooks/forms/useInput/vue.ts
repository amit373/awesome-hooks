import { ref } from 'vue';

export function useInput(initialValue: string = '') {
  const value = ref(initialValue);

  const reset = () => {
    value.value = initialValue;
  };

  return { value, reset };
}
