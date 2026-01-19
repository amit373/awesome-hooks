import { ref, onMounted, onUnmounted, readonly } from 'vue';

export function useMediaQuery(query: string) {
  const matches = ref(false);
  
  let mediaQuery: MediaQueryList;
  const handler = (e: MediaQueryListEvent | MediaQueryList) => {
    matches.value = e.matches;
  };

  onMounted(() => {
    mediaQuery = window.matchMedia(query);
    handler(mediaQuery);
    mediaQuery.addEventListener('change', handler);
  });

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handler);
    }
  });

  return readonly(matches);
}
