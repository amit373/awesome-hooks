import { onMounted, onUnmounted, ref, Ref } from 'vue';

interface UseIdleOptions {
  timeout?: number;
  events?: string[];
}

/**
 * Detect when the user has been idle for a given timeout
 * @param timeout - Idle timeout in ms (default: 60000)
 * @param options - Optional events to listen for
 * @returns Object with isIdle ref and reset function
 */
export function useIdle(
  timeout = 60_000,
  options: UseIdleOptions = {}
): { isIdle: Ref<boolean>; reset: () => void } {
  const { events = ['mousemove', 'keydown', 'scroll', 'touchstart'] } = options;
  const isIdle = ref(false);
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const reset = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    isIdle.value = false;
    timerId = setTimeout(() => {
      isIdle.value = true;
    }, timeout);
  };

  const handleEvent = () => reset();

  onMounted(() => {
    reset();
    events.forEach((ev) => window.addEventListener(ev, handleEvent));
  });

  onUnmounted(() => {
    events.forEach((ev) => window.removeEventListener(ev, handleEvent));
    if (timerId) clearTimeout(timerId);
  });

  return { isIdle, reset };
}
