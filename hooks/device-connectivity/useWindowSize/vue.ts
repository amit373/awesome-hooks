import { onMounted, onUnmounted, ref } from 'vue';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * A Vue composable for tracking window size
 * @returns Object containing width and height of the window
 */
export function useWindowSize(): WindowSize {
  const size = ref<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleResize = () => {
    size.value = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  });

  return size.value;
}
