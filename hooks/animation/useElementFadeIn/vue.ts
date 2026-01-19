import { ref, onMounted } from 'vue';

export function useElementFadeIn(duration: number = 500, delay: number = 0) {
  const elementRef = ref<HTMLElement | null>(null);
  const isVisible = ref(false);

  onMounted(() => {
    if (!elementRef.value) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            isVisible.value = true;
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.value);
  });

  return { elementRef, isVisible };
}
