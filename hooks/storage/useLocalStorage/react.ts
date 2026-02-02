import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  removeValue: () => void;
  error: Error | null;
}

/**
 * React hook for using localStorage with type safety and error handling
 * @param key - The localStorage key
 * @param initialValue - Initial value to use if key doesn't exist
 * @returns Object with value, setter, remover, and error state
 */
export function useLocalStorage<T = unknown>(
  key: string,
  initialValue: T | null = null
): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Load initial value from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item));
      } else {
        setValue(initialValue);
        if (initialValue !== null) {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setValue(initialValue);
    }
  }, [key, initialValue]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== JSON.stringify(value)) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setValue(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, value]);

  const setStoredValue = useCallback(
    (newValue: T | null) => {
      try {
        if (newValue === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        }
        setValue(newValue);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [key]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    error,
  };
}
