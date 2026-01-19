import { ref } from 'vue';

export function useRadio(initialValue: string = '') {
  const value = ref(initialValue);
  return { value };
}
