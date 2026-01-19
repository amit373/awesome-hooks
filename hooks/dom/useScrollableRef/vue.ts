import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollableRef() {
  const elementRef = ref<HTMLElement | null>(null);
  const canScroll = ref(false);

  const checkScroll = () => {
    if (elementRef.value) {
      canScroll.value = elementRef.value.scrollHeight > elementRef.value.clientHeight;
    }
  };

  onMounted(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScroll);
  });

  return { elementRef, canScroll };
}
