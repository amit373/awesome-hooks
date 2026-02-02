import { useEffect, useRef } from 'react';

/**
 * Store and return the previous value of a state or prop
 * @param value - Current value to track
 * @returns Previous value (undefined on first render)
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
