import { ref, onMounted, onUnmounted } from 'vue';

export function useIdle(ms: number = 3000) {
  const isIdle = ref(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  const resetTimer = () => {
    isIdle.value = false;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => isIdle.value = true, ms);
  };

  onMounted(() => {
    ['mousemove', 'keydown', 'wheel', 'touchstart'].forEach(event => 
      window.addEventListener(event, resetTimer)
    );
    resetTimer();
  });

  onUnmounted(() => {
    ['mousemove', 'keydown', 'wheel', 'touchstart'].forEach(event => 
      window.removeEventListener(event, resetTimer)
    );
    clearTimeout(timeoutId);
  });

  return isIdle;
}
