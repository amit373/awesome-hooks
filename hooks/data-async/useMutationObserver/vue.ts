import { ref, onMounted, onUnmounted, watch } from 'vue';

export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  }
) {
  const elementRef = ref<HTMLElement | null>(null);
  let observer: MutationObserver;

  onMounted(() => {
    // Wait for ref to be populated
  });

  watch(elementRef, (el) => {
    if (observer) observer.disconnect();
    if (el) {
      observer = new MutationObserver(callback);
      observer.observe(el, options);
    }
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return elementRef;
}
