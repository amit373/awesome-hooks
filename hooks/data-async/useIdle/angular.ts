import { DestroyRef, inject, signal, WritableSignal } from '@angular/core';

interface UseIdleOptions {
  timeout?: number;
  events?: string[];
}

/**
 * Detect when the user has been idle for a given timeout
 * @param timeout - Idle timeout in ms (default: 60000)
 * @param options - Optional events to listen for
 * @returns Object with isIdle signal and reset function
 */
export function useIdle(
  timeout = 60_000,
  options: UseIdleOptions = {}
): { isIdle: WritableSignal<boolean>; reset: () => void } {
  const { events = ['mousemove', 'keydown', 'scroll', 'touchstart'] } = options;
  const isIdle = signal(false);
  const destroyRef = inject(DestroyRef);
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const reset = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    isIdle.set(false);
    timerId = setTimeout(() => isIdle.set(true), timeout);
  };

  const handleEvent = () => reset();

  if (typeof window !== 'undefined') {
    reset();
    events.forEach((ev) => window.addEventListener(ev, handleEvent));
  }

  destroyRef.onDestroy(() => {
    events.forEach((ev) => {
      if (typeof window !== 'undefined') {
        window.removeEventListener(ev, handleEvent);
      }
    });
    if (timerId) clearTimeout(timerId);
  });

  return { isIdle, reset };
}
