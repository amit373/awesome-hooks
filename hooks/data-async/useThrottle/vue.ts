import { ref, onUnmounted } from 'vue';

/**
 * Throttle composable for limiting function execution frequency
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds (default: 300)
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay = 300
): T {
  const lastExecTime = ref(0);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  onUnmounted(cleanup);

  const throttledCallback = ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime.value >= delay) {
      callback(...args);
      lastExecTime.value = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(
        () => {
          callback(...args);
          lastExecTime.value = Date.now();
        },
        delay - (currentTime - lastExecTime.value)
      );
    }
  }) as T;

  return throttledCallback;
}
