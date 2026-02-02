import { onUnmounted, ref, watch } from 'vue';

/**
 * Vue composable for debouncing a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const debouncedValue = ref<T>(value);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  watch(
    () => value,
    newValue => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return debouncedValue.value;
}
