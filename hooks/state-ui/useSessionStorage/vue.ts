import { ref, watch } from 'vue';

export function useSessionStorage<T>(key: string, initialValue: T) {
  const storedValue = ref<T>(initialValue);

  // Initialize
  if (typeof window !== 'undefined') {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        storedValue.value = JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
    }
  }

  // Watch for changes
  watch(storedValue, (newValue) => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, { deep: true });

  return storedValue;
}
