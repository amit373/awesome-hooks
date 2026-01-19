import { ref, onMounted, onUnmounted, readonly } from 'vue';

export function useScrollPosition() {
  const x = ref(0);
  const y = ref(0);

  const handleScroll = () => {
    x.value = window.scrollX;
    y.value = window.scrollY;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { x: readonly(x), y: readonly(y) };
}
