import { onMounted, onUnmounted, ref, type Ref } from 'vue';

interface UseAnimationFrameReturn {
  frame: Ref<number>;
  fps: Ref<number>;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/**
 * Vue composable for managing animation frames with FPS tracking
 * @returns Object with frame count, FPS, and control methods
 */
export function useAnimationFrame(): UseAnimationFrameReturn {
  const frame = ref(0);
  const fps = ref(0);
  let isActive = false;
  let startTime = 0;
  let frameCount = 0;
  let animationFrameId: number | null = null;

  const calculateFps = () => {
    const now = performance.now();
    const delta = now - startTime;
    if (delta > 1000) {
      // Update FPS every second
      const fpsValue = Math.round((frameCount * 1000) / delta);
      fps.value = fpsValue;

      // Reset for next calculation
      startTime = now;
      frameCount = 0;
    }
  };

  const animate = () => {
    if (!isActive) return;

    frame.value++;
    frameCount++;
    calculateFps();

    animationFrameId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (!isActive) {
      isActive = true;
      startTime = performance.now();
      frameCount = 0;
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  const stop = () => {
    if (isActive && animationFrameId) {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const reset = () => {
    stop();
    frame.value = 0;
    fps.value = 0;
    frameCount = 0;
  };

  onMounted(() => {
    // Start animation automatically
    start();
  });

  onUnmounted(() => {
    stop();
  });

  return {
    frame,
    fps,
    start,
    stop,
    reset,
  };
}
