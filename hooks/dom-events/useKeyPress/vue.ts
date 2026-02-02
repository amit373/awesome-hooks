import { onUnmounted, watch } from 'vue';

interface UseKeyPressOptions {
  target?: EventTarget | null;
  event?: 'keydown' | 'keyup';
}

/**
 * Run a callback when a specific key is pressed
 * @param keys - Key(s) to listen for (e.g. 'Escape', 'Enter')
 * @param callback - Function to run when key is pressed
 * @param options - Optional target (default: window) and event type (default: keydown)
 */
export function useKeyPress(
  keys: () => string | string[],
  callback: () => void,
  options: UseKeyPressOptions = {}
): void {
  const { target = typeof window !== 'undefined' ? window : null, event = 'keydown' } = options;

  let cleanup: (() => void) | null = null;

  const attach = () => {
    if (cleanup) cleanup();
    if (!target) return;
    const keysArray = Array.isArray(keys()) ? keys() : [keys()];

    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      const match = keysArray.length === 1 ? key === keysArray[0] : keysArray.includes(key);
      if (match) callback();
    };

    target.addEventListener(event, handler as EventListener);
    cleanup = () => target.removeEventListener(event, handler as EventListener);
  };

  const stop = watch(() => keys(), attach, { immediate: true });

  onUnmounted(() => {
    stop();
    if (cleanup) cleanup();
  });
}
