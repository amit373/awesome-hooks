import { onMounted, onUnmounted, ref } from 'vue';

/**
 * A Vue composable for using CSS media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 */
export function useMediaQuery(query: string): boolean {
  const matches = ref(false);

  let mediaQueryList: MediaQueryList;

  const handleChange = (e: MediaQueryListEvent) => {
    matches.value = e.matches;
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;

    mediaQueryList = window.matchMedia(query);

    // For older browsers that don't support addEventListener
    if ('addEventListener' in mediaQueryList) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      (mediaQueryList as any).addListener(handleChange);
    }

    matches.value = mediaQueryList.matches;
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined' && mediaQueryList) {
      if ('removeEventListener' in mediaQueryList) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        (mediaQueryList as any).removeListener(handleChange);
      }
    }
  });

  return matches.value;
}
