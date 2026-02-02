import { inject } from '@angular/core';
import { DestroyRef } from '@angular/core';

/**
 * Throttle function for limiting execution frequency
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds (default: 300)
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay = 300
): T {
  let lastExecTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const destroyRef = inject(DestroyRef);

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  destroyRef.onDestroy(cleanup);

  const throttledCallback = ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime >= delay) {
      callback(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(
        () => {
          callback(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime)
      );
    }
  }) as T;

  return throttledCallback;
}
