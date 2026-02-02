import { useState, useEffect, useCallback, useRef } from 'react';

interface UseIdleOptions {
  timeout?: number;
  events?: string[];
}

/**
 * Detect when the user has been idle for a given timeout
 * @param timeout - Idle timeout in ms (default: 60000)
 * @param options - Optional events to listen for (default: mousemove, keydown, etc.)
 * @returns [isIdle, reset] - isIdle true when idle for timeout ms; reset to reset timer
 */
export function useIdle(
  timeout = 60_000,
  options: UseIdleOptions = {}
): [boolean, () => void] {
  const eventsRef = useRef(options.events ?? ['mousemove', 'keydown', 'scroll', 'touchstart']);
  eventsRef.current = options.events ?? ['mousemove', 'keydown', 'scroll', 'touchstart'];
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsIdle(false);
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) setIsIdle(true);
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    mountedRef.current = true;
    reset();

    const handleEvent = () => reset();
    const events = eventsRef.current;

    events.forEach((ev) => {
      if (typeof window !== 'undefined') {
        window.addEventListener(ev, handleEvent);
      }
    });

    return () => {
      mountedRef.current = false;
      events.forEach((ev) => {
        if (typeof window !== 'undefined') {
          window.removeEventListener(ev, handleEvent);
        }
      });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout, reset]);

  return [isIdle, reset];
}
