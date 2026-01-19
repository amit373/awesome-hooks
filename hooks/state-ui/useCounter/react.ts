import { useState } from 'react';

interface UseCounterOptions {
  min?: number;
  max?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn {
  const { min, max } = options;
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(c => {
      const next = c + 1;
      return max !== undefined && next > max ? c : next;
    });
  };

  const decrement = () => {
    setCount(c => {
      const next = c - 1;
      return min !== undefined && next < min ? c : next;
    });
  };

  const set = (value: number) => {
    setCount(value);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, set, reset };
}
