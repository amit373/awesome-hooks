import { ref, watch, type Ref } from 'vue';

export function useThrottle<T>(value: Ref<T>, limit: number) {
  const throttledValue = ref<T>(value.value) as Ref<T>;
  let lastRan = Date.now();
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newVal) => {
    const now = Date.now();
    if (now - lastRan >= limit) {
      throttledValue.value = newVal;
      lastRan = now;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          throttledValue.value = newVal;
          lastRan = Date.now();
        }
      }, limit - (now - lastRan));
    }
  });

  return throttledValue;
}
