import { signal, WritableSignal } from '@angular/core';

interface UseCounterReturn {
  value: WritableSignal<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

/**
 * Counter hook for numeric state management
 * @param initialValue - Initial counter value (default: 0)
 * @param step - Step increment/decrement value (default: 1)
 * @returns Object with value signal and action methods
 */
export function useCounter(initialValue = 0, step = 1): UseCounterReturn {
  const value: WritableSignal<number> = signal(initialValue);

  const increment = () => {
    value.update(v => v + step);
  };

  const decrement = () => {
    value.update(v => v - step);
  };

  const reset = () => {
    value.set(initialValue);
  };

  const setValue = (newValue: number) => {
    value.set(newValue);
  };

  return {
    value,
    increment,
    decrement,
    reset,
    setValue,
  };
}
