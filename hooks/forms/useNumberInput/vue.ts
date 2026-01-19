import { ref } from 'vue';

export function useNumberInput(initialValue: number = 0) {
  const value = ref(initialValue);
  
  const increment = () => value.value++;
  const decrement = () => value.value--;

  return { value, increment, decrement };
}
