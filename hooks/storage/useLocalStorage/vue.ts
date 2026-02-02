import { onMounted, onUnmounted, ref, type Ref } from 'vue';

interface UseLocalStorageReturn<T> {
  value: Ref<T | null>;
  setValue: (value: T | null) => void;
  removeValue: () => void;
  error: Ref<Error | null>;
}

/**
 * Vue composable for using localStorage with type safety and error handling
 * @param key - The localStorage key
 * @param initialValue - Initial value to use if key doesn't exist
 * @returns Object with value, setter, remover, and error state
 */
export function useLocalStorage<T = unknown>(
  key: string,
  initialValue: T | null = null
): UseLocalStorageReturn<T> {
  const value = ref<T | null>(null);
  const error = ref<Error | null>(null);

  // Load initial value from localStorage
  const loadValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        value.value = JSON.parse(item);
      } else {
        value.value = initialValue;
        if (initialValue !== null) {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      value.value = initialValue;
    }
  };

  // Listen for storage changes from other tabs/windows
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === key && e.newValue !== JSON.stringify(value.value)) {
      try {
        value.value = e.newValue ? JSON.parse(e.newValue) : null;
      } catch {
        value.value = null;
      }
    }
  };

  onMounted(() => {
    loadValue();
    window.addEventListener('storage', handleStorageChange);
  });

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
  });

  const setStoredValue = (newValue: T | null) => {
    try {
      if (newValue === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      value.value = newValue;
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      value.value = null;
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    }
  };

  return {
    value: value as Ref<T | null>,
    setValue: setStoredValue,
    removeValue,
    error,
  };
}
