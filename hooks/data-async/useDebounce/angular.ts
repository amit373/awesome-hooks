import { DestroyRef, effect, inject, signal } from '@angular/core';

/**
 * Angular signal-based debounce function
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const debouncedValue = signal<T>(value);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const destroyRef = inject(DestroyRef);

  // Effect to handle value changes
  effect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      debouncedValue.set(value);
    }, delay);
  });

  // Clean up on component destruction
  destroyRef.onDestroy(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return debouncedValue();
}
