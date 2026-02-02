import { onMounted, ref, watch } from 'vue';

interface UseSessionStorageReturn<T> {
  value: T | null;
  set: (value: T) => void;
  remove: () => void;
  update: (updater: (prevValue: T | null) => T) => void;
}

/**
 * Vue composable for using sessionStorage
 * @param key The sessionStorage key to manage
 * @param initialValue The initial value to use if nothing is stored
 * @returns Object with value, setter, remover, and updater functions
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T | null = null
): UseSessionStorageReturn<T> {
  const valueRef = ref<T | null>(initialValue);

  // Initialize value from sessionStorage on component mount
  onMounted(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.sessionStorage.getItem(key);
      if (item !== null) {
        valueRef.value = JSON.parse(item);
      } else {
        valueRef.value = initialValue;
      }
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      valueRef.value = initialValue;
    }
  });

  // Watch for changes and update sessionStorage
  watch(
    valueRef,
    newValue => {
      if (typeof window === 'undefined') return;

      try {
        if (newValue === null) {
          window.sessionStorage.removeItem(key);
        } else {
          window.sessionStorage.setItem(key, JSON.stringify(newValue));
        }
      } catch (error) {
        console.error(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    { immediate: true }
  );

  const set = (newValue: T) => {
    valueRef.value = newValue;
  };

  const remove = () => {
    valueRef.value = null;
  };

  const update = (updater: (prevValue: T | null) => T) => {
    valueRef.value = updater(valueRef.value);
  };

  return {
    get value() {
      return valueRef.value;
    },
    set value(val: T | null) {
      valueRef.value = val;
    },
    set,
    remove,
    update,
  };
}
