import { ref, Ref, watch } from 'vue';

/**
 * Store and return the previous value of a state or prop
 * @param value - Current value to track
 * @returns Ref containing the previous value (undefined on first run)
 */
export function usePrevious<T>(value: T): Ref<T | undefined> {
  const previous = ref(undefined as T | undefined);

  watch(
    () => value,
    (newVal, oldVal) => {
      previous.value = oldVal;
    },
    { flush: 'sync' }
  );

  return previous as Ref<T | undefined>;
}
