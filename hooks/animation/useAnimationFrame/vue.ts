import { onMounted, onUnmounted, ref } from 'vue';

export function useAnimationFrame(callback: (deltaTime: number) => void) {
  const requestID = ref<number | null>(null);
  const previousTime = ref<number | undefined>(undefined);

  const animate = (time: number) => {
    if (previousTime.value !== undefined) {
      const deltaTime = time - previousTime.value;
      callback(deltaTime);
    }
    previousTime.value = time;
    requestID.value = requestAnimationFrame(animate);
  };

  onMounted(() => {
    requestID.value = requestAnimationFrame(animate);
  });

  onUnmounted(() => {
    if (requestID.value) cancelAnimationFrame(requestID.value);
  });
}
