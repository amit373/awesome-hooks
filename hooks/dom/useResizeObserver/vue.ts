import { ref, onMounted, onUnmounted } from 'vue';

export function useResizeObserver() {
  const elementRef = ref<HTMLElement | null>(null);
  const size = ref<DOMRectReadOnly | null>(null);
  let observer: ResizeObserver | null = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        size.value = entries[0].contentRect;
      }
    });

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return { elementRef, size };
}
