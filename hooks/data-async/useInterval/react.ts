import { useEffect, useRef } from 'react';

/**
 * Run a callback at a fixed interval with proper cleanup
 * @param callback - Function to run on each tick
 * @param delay - Interval in ms; null or 0 to pause
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    if (delay === null || delay <= 0) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
