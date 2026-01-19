import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const elementRef = ref<HTMLElement | null>(null);
  const entry = ref<IntersectionObserverEntry | null>(null);
  let observer: IntersectionObserver;

  onMounted(() => {
    if (elementRef.value) {
      observer = new IntersectionObserver(([ent]) => {
        entry.value = ent;
      }, options);
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return { elementRef, entry };
}
