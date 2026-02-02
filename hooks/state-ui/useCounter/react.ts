import { useState, useCallback } from 'react';

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

/**
 * Counter hook for numeric state management
 * @param initialValue - Initial counter value (default: 0)
 * @param step - Step increment/decrement value (default: 1)
 * @returns [value, actions] tuple
 */
export function useCounter(
  initialValue = 0,
  step = 1
): [number, CounterActions] {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setValue = useCallback((value: number) => {
    setCount(value);
  }, []);

  const actions: CounterActions = {
    increment,
    decrement,
    reset,
    setValue,
  };

  return [count, actions];
}
