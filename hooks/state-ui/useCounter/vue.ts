import { ref, Ref } from 'vue';

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

interface UseCounterReturn {
  value: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

/**
 * Counter hook for numeric state management
 * @param initialValue - Initial counter value (default: 0)
 * @param step - Step increment/decrement value (default: 1)
 * @returns Object with value ref and action methods
 */
export function useCounter(initialValue = 0, step = 1): UseCounterReturn {
  const value: Ref<number> = ref(initialValue);

  const increment = () => {
    value.value += step;
  };

  const decrement = () => {
    value.value -= step;
  };

  const reset = () => {
    value.value = initialValue;
  };

  const setValue = (newValue: number) => {
    value.value = newValue;
  };

  return {
    value,
    increment,
    decrement,
    reset,
    setValue,
  };
}
