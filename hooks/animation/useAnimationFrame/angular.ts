import { signal } from '@angular/core';

interface UseAnimationFrameReturn {
  frame: number;
  fps: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/**
 * Angular function for managing animation frames with FPS tracking
 * @returns Object with frame count, FPS, and control methods
 */
export function useAnimationFrame(): UseAnimationFrameReturn {
  const frameSignal = signal(0);
  const fpsSignal = signal(0);
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
      fpsSignal.set(fpsValue);

      // Reset for next calculation
      startTime = now;
      frameCount = 0;
    }
  };

  const animate = () => {
    if (!isActive) return;

    frameSignal.set(frameSignal() + 1);
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
    frameSignal.set(0);
    fpsSignal.set(0);
    frameCount = 0;
  };

  // Start animation automatically
  start();

  // Return the current state and a cleanup function
  const cleanup = () => {
    stop();
  };

  return {
    get frame() {
      return frameSignal();
    },
    get fps() {
      return fpsSignal();
    },
    start,
    stop,
    reset,
  };
}
