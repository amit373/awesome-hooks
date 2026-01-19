import { ref } from 'vue';

export function useSelect(initialValue: string = '') {
  const value = ref(initialValue);
  return { value };
}
