import { onUnmounted, ref, Ref, watch } from 'vue';

/**
 * Debounce a value (e.g. search input) - updates after delay of no changes
 * @param value - Ref or getter for value to debounce
 * @param delay - Delay in ms (default: 300)
 * @returns Ref containing debounced value
 */
export function useDebouncedValue<T>(
  value: Ref<T> | (() => T),
  delay = 300
): Ref<T> {
  const getValue = typeof value === 'function' ? (value as () => T) : () => (value as Ref<T>).value;
  const debouncedValue = ref<T>(getValue()) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  watch(
    () => getValue(),
    (newVal) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        debouncedValue.value = newVal;
      }, delay);
    },
    { immediate: true }
  );

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  return debouncedValue;
}
