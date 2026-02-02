import { useEffect, useRef, useState } from 'react';

interface SpringConfig {
  tension?: number;
  friction?: number;
  precision?: number;
}

export function useSpring(
  initialValues: Record<string, number>,
  config: SpringConfig = {}
) {
  const { tension = 170, friction = 26, precision = 0.01 } = config;

  const [animatedValues, setAnimatedValues] = useState(initialValues);

  // Store target values
  const targetRef = useRef(initialValues);
  const velocityRef = useRef<Record<string, number>>(
    Object.keys(initialValues).reduce(
      (acc, key) => {
        acc[key] = 0;
        return acc;
      },
      {} as Record<string, number>
    )
  );

  const setTarget = (values: Partial<Record<string, number>>) => {
    targetRef.current = Object.assign({}, targetRef.current, values);
  };

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      const current = { ...animatedValues };
      const velocity = { ...velocityRef.current };
      const target = { ...targetRef.current };

      let shouldUpdate = false;
      const newCurrent: Record<string, number> = {};
      const newVelocity: Record<string, number> = {};

      for (const key in target) {
        const targetVal = target[key] ?? 0;
        const currentVal = current[key] ?? 0;
        const velocityVal = velocity[key] ?? 0;

        // Calculate spring physics
        const displacement = targetVal - currentVal;
        const acceleration =
          (tension * displacement - friction * velocityVal) / 100;

        // Update velocity and position
        newVelocity[key] = velocityVal + acceleration * 0.016;
        newCurrent[key] = currentVal + newVelocity[key] * 0.016;

        // Apply damping
        newVelocity[key] = newVelocity[key] * 0.9;

        // Check if we're close enough to target
        if (
          Math.abs(displacement) > precision ||
          Math.abs(newVelocity[key]) > precision
        ) {
          shouldUpdate = true;
        }
      }

      velocityRef.current = newVelocity;
      setAnimatedValues(newCurrent);

      if (shouldUpdate) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animatedValues, tension, friction, precision]);

  return [animatedValues, setTarget] as [
    Record<string, number>,
    (values: Partial<Record<string, number>>) => void,
  ];
}
