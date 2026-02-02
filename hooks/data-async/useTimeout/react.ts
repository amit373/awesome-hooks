import { useEffect, useRef } from 'react';

/**
 * Run a callback once after a delay with proper cleanup
 * @param callback - Function to run after delay
 * @param delay - Delay in ms; null to not run
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    if (delay === null || delay < 0) return;
    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
