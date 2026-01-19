import { ref, watch } from 'vue';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = ref<T>(initialValue);

  // Initialize
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        storedValue.value = JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }

  // Watch for changes
  watch(storedValue, (newValue) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, { deep: true });

  return storedValue;
}
