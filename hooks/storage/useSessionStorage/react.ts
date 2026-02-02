import { useCallback, useEffect, useState } from 'react';

interface UseSessionStorageReturn<T> {
  value: T | null;
  set: (value: T) => void;
  remove: () => void;
  update: (updater: (prevValue: T | null) => T) => void;
}

/**
 * React hook for using sessionStorage
 * @param key The sessionStorage key to manage
 * @param initialValue The initial value to use if nothing is stored
 * @returns Object with value, setter, remover, and updater functions
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T | null = null
): UseSessionStorageReturn<T> {
  const [value, setValue] = useState<T | null>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (value === null) {
        window.sessionStorage.removeItem(key);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, value]);

  const set = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  const remove = useCallback(() => {
    setValue(null);
  }, []);

  const update = useCallback((updater: (prevValue: T | null) => T) => {
    setValue(prev => updater(prev));
  }, []);

  return { value, set, remove, update };
}
