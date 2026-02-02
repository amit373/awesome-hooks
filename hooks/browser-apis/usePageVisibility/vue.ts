import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Vue composable for tracking page visibility
 * @returns Boolean indicating if the page is currently visible
 */
export function usePageVisibility(): boolean {
  const isVisible = ref(true);

  const handleVisibilityChange = () => {
    isVisible.value = !document.hidden;
  };

  onMounted(() => {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onUnmounted(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  });

  return isVisible.value;
}
