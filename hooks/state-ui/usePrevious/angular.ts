import { effect, signal, Signal } from '@angular/core';

/**
 * Store and return the previous value of a signal
 * @param value - Signal to track
 * @returns Signal containing the previous value (undefined on first run)
 */
export function usePrevious<T>(value: Signal<T>): Signal<T | undefined> {
  const previous = signal<T | undefined>(undefined);
  let lastValue: T = value();

  effect(() => {
    const current = value();
    if (current !== lastValue) {
      previous.set(lastValue);
      lastValue = current;
    }
  });

  return previous;
}
