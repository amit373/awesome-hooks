import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Vue composable for monitoring online/offline status
 * @returns Boolean indicating if the browser is online
 */
export function useOnline(): boolean {
  const isOnline = ref<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const handleOnline = () => {
    isOnline.value = true;
  };

  const handleOffline = () => {
    isOnline.value = false;
  };

  onMounted(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  });

  return isOnline.value;
}
