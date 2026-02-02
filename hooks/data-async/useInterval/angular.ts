import { DestroyRef, effect, inject } from '@angular/core';

/**
 * Run a callback at a fixed interval with proper cleanup
 * @param callback - Function to run on each tick
 * @param delay - Interval in ms; null or 0 to pause (getter/signal)
 */
export function useInterval(
  callback: () => void,
  delay: () => number | null
): void {
  const destroyRef = inject(DestroyRef);
  let id: ReturnType<typeof setInterval> | null = null;

  effect(() => {
    const d = delay();
    if (id) {
      clearInterval(id);
      id = null;
    }
    if (d !== null && d > 0) {
      id = setInterval(callback, d);
    }
  });

  destroyRef.onDestroy(() => {
    if (id) clearInterval(id);
  });
}
