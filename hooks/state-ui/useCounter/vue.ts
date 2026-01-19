import { ref, readonly } from 'vue';

interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const count = ref(initialValue);
  const { min, max } = options;

  const increment = () => {
    const next = count.value + 1;
    if (max !== undefined && next > max) return;
    count.value = next;
  };

  const decrement = () => {
    const next = count.value - 1;
    if (min !== undefined && next < min) return;
    count.value = next;
  };

  const set = (value: number) => {
    count.value = value;
  };

  const reset = () => {
    count.value = initialValue;
  };

  return {
    count: readonly(count),
    increment,
    decrement,
    set,
    reset
  };
}
