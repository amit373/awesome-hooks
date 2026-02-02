import { DestroyRef, effect, inject } from '@angular/core';

/**
 * Run a callback once after a delay with proper cleanup
 * @param callback - Function to run after delay
 * @param delay - Delay in ms (getter); null to not run
 */
export function useTimeout(
  callback: () => void,
  delay: () => number | null
): void {
  const destroyRef = inject(DestroyRef);
  let id: ReturnType<typeof setTimeout> | null = null;

  effect(() => {
    const d = delay();
    if (id) {
      clearTimeout(id);
      id = null;
    }
    if (d !== null && d >= 0) {
      id = setTimeout(() => {
        callback();
        id = null;
      }, d);
    }
  });

  destroyRef.onDestroy(() => {
    if (id) clearTimeout(id);
  });
}
