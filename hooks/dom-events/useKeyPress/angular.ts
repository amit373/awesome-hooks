import { DestroyRef, effect, inject } from '@angular/core';

interface UseKeyPressOptions {
  target?: EventTarget | null;
  event?: 'keydown' | 'keyup';
}

/**
 * Run a callback when a specific key is pressed
 * @param keys - Key(s) to listen for (getter, e.g. () => 'Escape')
 * @param callback - Function to run when key is pressed
 * @param options - Optional target (default: window) and event type (default: keydown)
 */
export function useKeyPress(
  keys: () => string | string[],
  callback: () => void,
  options: UseKeyPressOptions = {}
): void {
  const { target = typeof window !== 'undefined' ? window : null, event = 'keydown' } = options;
  const destroyRef = inject(DestroyRef);
  let cleanup: (() => void) | null = null;

  effect(() => {
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
  });

  destroyRef.onDestroy(() => {
    if (cleanup) cleanup();
  });
}
