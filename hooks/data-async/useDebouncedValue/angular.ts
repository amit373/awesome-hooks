import { DestroyRef, effect, inject, signal, Signal } from '@angular/core';

/**
 * Debounce a value (e.g. search input) - updates after delay of no changes
 * @param value - Signal or getter for value to debounce
 * @param delay - Delay in ms (default: 300)
 * @returns Signal containing debounced value
 */
export function useDebouncedValue<T>(
  value: Signal<T> | (() => T),
  delay = 300
): Signal<T> {
  const getValue = typeof value === 'function' ? (value as () => T) : () => (value as Signal<T>)();
  const debouncedValue = signal<T>(getValue());
  const destroyRef = inject(DestroyRef);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  effect(() => {
    const newVal = getValue();
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => debouncedValue.set(newVal), delay);
  });

  destroyRef.onDestroy(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  return debouncedValue;
}
