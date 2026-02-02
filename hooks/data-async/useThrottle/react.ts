import { useEffect, useRef } from 'react';

/**
 * Throttle hook for limiting function execution frequency
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds (default: 300)
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay = 300
): T {
  const lastExecTimeRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const throttledCallback = ((...args: Parameters<T>) => {
    const currentTime = Date.now();
    const timeSinceLastExec = lastExecTimeRef.current
      ? currentTime - lastExecTimeRef.current
      : delay; // First call: allow immediate execution

    if (timeSinceLastExec >= delay) {
      lastExecTimeRef.current = currentTime;
      callbackRef.current(...args);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastExecTimeRef.current = Date.now();
        timeoutRef.current = null;
        callbackRef.current(...args);
      }, delay - timeSinceLastExec);
    }
  }) as T;

  return throttledCallback;
}
