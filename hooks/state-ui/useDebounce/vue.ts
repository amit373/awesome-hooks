import { ref, watch, type Ref } from 'vue';

export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debouncedValue = ref<T>(value.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newVal) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newVal;
    }, delay);
  });

  return debouncedValue;
}
