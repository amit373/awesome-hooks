import { ref, watchEffect, onUnmounted } from 'vue';

export function usePolling<T>(callback: () => Promise<T>, intervalTime: number) {
  const data = ref<T | null>(null);
  let timer: ReturnType<typeof setInterval>;

  const tick = async () => {
    try {
      data.value = await callback();
    } catch (e) {
      console.error(e);
    }
  };

  watchEffect(() => {
    tick();
    timer = setInterval(tick, intervalTime);
  });

  onUnmounted(() => clearInterval(timer));

  return data;
}
