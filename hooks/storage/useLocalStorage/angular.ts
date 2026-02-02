import { signal, computed, effect } from '@angular/core';

interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  removeValue: () => void;
  error: Error | null;
}

/**
 * Angular function for using localStorage with type safety and error handling
 * @param key - The localStorage key
 * @param initialValue - Initial value to use if key doesn't exist
 * @returns Object with value, setter, remover, and error state
 */
export function useLocalStorage<T = unknown>(
  key: string,
  initialValue: T | null = null
): UseLocalStorageReturn<T> {
  const valueSignal = signal<T | null>(null);
  const errorSignal = signal<Error | null>(null);

  // Load initial value from localStorage
  const loadValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        valueSignal.set(JSON.parse(item));
      } else {
        valueSignal.set(initialValue);
        if (initialValue !== null) {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
        }
      }
    } catch (err) {
      errorSignal.set(err instanceof Error ? err : new Error(String(err)));
      valueSignal.set(initialValue);
    }
  };

  // Listen for storage changes from other tabs/windows
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === key && e.newValue !== JSON.stringify(valueSignal())) {
      try {
        valueSignal.set(e.newValue ? JSON.parse(e.newValue) : null);
      } catch {
        valueSignal.set(null);
      }
    }
  };

  // Initialize and set up event listener
  loadValue();
  window.addEventListener('storage', handleStorageChange);

  // Clean up event listener
  const cleanup = () => {
    window.removeEventListener('storage', handleStorageChange);
  };

  // Set up cleanup if possible (would need access to lifecycle hooks)
  // For now, we'll rely on the user to call cleanup when appropriate

  const setStoredValue = (newValue: T | null) => {
    try {
      if (newValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      valueSignal.set(newValue);
      errorSignal.set(null);
    } catch (err) {
      errorSignal.set(err instanceof Error ? err : new Error(String(err)));
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      valueSignal.set(null);
      errorSignal.set(null);
    } catch (err) {
      errorSignal.set(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return {
    get value() {
      return valueSignal();
    },
    setValue: setStoredValue,
    removeValue,
    get error() {
      return errorSignal();
    },
  };
}
