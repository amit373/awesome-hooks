import { onUnmounted, watch } from 'vue';

/**
 * Run a callback once after a delay with proper cleanup
 * @param callback - Function to run after delay
 * @param delay - Delay in ms (getter); null to not run
 */
export function useTimeout(
  callback: () => void,
  delay: () => number | null
): void {
  let id: ReturnType<typeof setTimeout> | null = null;

  const stop = watch(
    () => delay(),
    (d) => {
      if (id) {
        clearTimeout(id);
        id = null;
      }
      if (d !== null && d >= 0) {
        id = setTimeout(callback, d);
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    stop();
    if (id) clearTimeout(id);
  });
}
