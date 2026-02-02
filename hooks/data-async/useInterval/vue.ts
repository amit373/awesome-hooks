import { onUnmounted, watch } from 'vue';

/**
 * Run a callback at a fixed interval with proper cleanup
 * @param callback - Function to run on each tick
 * @param delay - Interval in ms (ref or getter); null or 0 to pause
 */
export function useInterval(
  callback: () => void,
  delay: () => number | null
): void {
  let id: ReturnType<typeof setInterval> | null = null;

  const stop = watch(
    () => delay(),
    (d) => {
      if (id) {
        clearInterval(id);
        id = null;
      }
      if (d !== null && d > 0) {
        id = setInterval(callback, d);
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    stop();
    if (id) clearInterval(id);
  });
}
