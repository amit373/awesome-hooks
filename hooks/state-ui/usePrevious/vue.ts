import { ref, watch, type Ref } from 'vue';

export function usePrevious<T>(value: Ref<T>) {
  const previous = ref<T | undefined>();
  
  watch(value, (_, oldVal) => {
    previous.value = oldVal;
  }, { flush: 'sync' });
  
  return previous;
}
