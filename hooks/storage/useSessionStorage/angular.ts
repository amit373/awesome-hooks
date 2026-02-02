import { computed, Injectable, signal } from '@angular/core';

interface UseSessionStorageReturn<T> {
  value: T | null;
  set: (value: T) => void;
  remove: () => void;
  update: (updater: (prevValue: T | null) => T) => void;
}

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  /**
   * Angular service for using sessionStorage
   * @param key The sessionStorage key to manage
   * @param initialValue The initial value to use if nothing is stored
   * @returns Object with value, setter, remover, and updater functions
   */
  useSessionStorage<T>(
    key: string,
    initialValue: T | null = null
  ): UseSessionStorageReturn<T> {
    let initialValueForSignal: T | null;
    if (typeof window !== 'undefined') {
      try {
        const item = window.sessionStorage.getItem(key);
        initialValueForSignal = item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error reading sessionStorage key "${key}":`, error);
        initialValueForSignal = initialValue;
      }
    } else {
      initialValueForSignal = initialValue;
    }

    const valueSignal = signal<T | null>(initialValueForSignal);

    // Create a watcher to sync with sessionStorage
    const syncWithStorage = computed(() => {
      const currentValue = valueSignal();
      if (typeof window !== 'undefined') {
        try {
          if (currentValue === null) {
            window.sessionStorage.removeItem(key);
          } else {
            window.sessionStorage.setItem(key, JSON.stringify(currentValue));
          }
        } catch (error) {
          console.error(`Error setting sessionStorage key "${key}":`, error);
        }
      }
      return currentValue;
    });

    const set = (newValue: T) => {
      valueSignal.set(newValue);
    };

    const remove = () => {
      valueSignal.set(null);
    };

    const update = (updater: (prevValue: T | null) => T) => {
      valueSignal.update(prev => updater(prev));
    };

    return {
      get value() {
        return valueSignal();
      },
      set value(val: T | null) {
        valueSignal.set(val);
      },
      set,
      remove,
      update,
    };
  }
}

// Standalone hook function for use outside of DI
export function useSessionStorage<T>(
  key: string,
  initialValue: T | null = null
) {
  const service = new SessionStorageService();
  return service.useSessionStorage(key, initialValue);
}
