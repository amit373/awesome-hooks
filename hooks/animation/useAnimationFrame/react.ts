import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAnimationFrameReturn {
  frame: number;
  fps: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/**
 * React hook for managing animation frames with FPS tracking
 * @returns Object with frame count, FPS, and control methods
 */
export function useAnimationFrame(): UseAnimationFrameReturn {
  const [frame, setFrame] = useState(0);
  const [fps, setFps] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(false);
  isActiveRef.current = isActive;
  const startTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const calculateFps = useCallback(() => {
    const now = performance.now();
    const delta = now - startTimeRef.current;
    if (delta > 1000) {
      // Update FPS every second
      const fpsValue = Math.round((frameCountRef.current * 1000) / delta);
      setFps(fpsValue);

      // Reset for next calculation
      startTimeRef.current = now;
      frameCountRef.current = 0;
    }
  }, []);

  const animate = useCallback(() => {
    if (!isActiveRef.current) return;

    setFrame(prev => {
      const newFrame = prev + 1;
      frameCountRef.current += 1;
      calculateFps();
      return newFrame;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [calculateFps]);

  const start = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      startTimeRef.current = performance.now();
      frameCountRef.current = 0;
      lastFrameTimeRef.current = startTimeRef.current;
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [isActive, animate]);

  const stop = useCallback(() => {
    if (isActive) {
      setIsActive(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [isActive]);

  const reset = useCallback(() => {
    stop();
    setFrame(0);
    setFps(0);
    frameCountRef.current = 0;
  }, [stop]);

  useEffect(() => {
    // Start animation automatically
    start();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [start]);

  return {
    frame,
    fps,
    start,
    stop,
    reset,
  };
}
