import { useEffect, useRef } from 'react';

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
  keys: string | string[],
  callback: () => void,
  options: UseKeyPressOptions = {}
): void {
  const { target = typeof window !== 'undefined' ? window : null, event = 'keydown' } = options;
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!target) return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      const match = keysArray.length === 1
        ? key === keysArray[0]
        : keysArray.includes(key);
      if (match) callbackRef.current();
    };

    target.addEventListener(event, handler as EventListener);
    return () => target.removeEventListener(event, handler as EventListener);
  }, [target, event, keysArray.join(',')]);
}
