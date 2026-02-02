import { signal, WritableSignal } from '@angular/core';

/**
 * Toggle hook for boolean state management
 * @param initialValue - Initial boolean value (default: false)
 * @returns Object with value signal, toggle, and setValue methods
 */
export function useToggle(initialValue = false) {
  const value: WritableSignal<boolean> = signal(initialValue);

  const toggle = () => {
    value.update(v => !v);
  };

  const setValue = (newValue: boolean) => {
    value.set(newValue);
  };

  return {
    value,
    toggle,
    setValue,
  };
}
