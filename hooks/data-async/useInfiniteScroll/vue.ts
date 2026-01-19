import { ref, onMounted, onUnmounted } from 'vue';

export function useInfiniteScroll(callback: () => void) {
  const loadMoreRef = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (loadMoreRef.value) {
      observer.observe(loadMoreRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return loadMoreRef;
}
