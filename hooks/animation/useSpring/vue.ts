import { onUnmounted, reactive } from 'vue';

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

  const animatedValues = reactive({ ...initialValues });
  const targetValues = reactive({ ...initialValues });
  const velocityValues = reactive<Record<string, number>>(
    Object.keys(initialValues).reduce(
      (acc, key) => {
        acc[key] = 0;
        return acc;
      },
      {} as Record<string, number>
    )
  );

  let animationFrameId: number | null = null;

  const update = () => {
    let shouldUpdate = false;
    const newCurrent: Record<string, number> = {};
    const newVelocity: Record<string, number> = {};

    for (const key in targetValues) {
      const targetVal = targetValues[key] ?? 0;
      const currentVal = animatedValues[key] ?? 0;
      const velocityVal = velocityValues[key] ?? 0;

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

    // Update reactive values
    for (const key in newCurrent) {
      animatedValues[key] = newCurrent[key]!;
      velocityValues[key] = newVelocity[key]!;
    }

    if (shouldUpdate) {
      animationFrameId = requestAnimationFrame(update);
    }
  };

  const setTarget = (values: Partial<Record<string, number>>) => {
    Object.assign(targetValues, values);
    if (animationFrameId === null) {
      animationFrameId = requestAnimationFrame(update);
    }
  };

  // Start animation
  animationFrameId = requestAnimationFrame(update);

  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return [animatedValues, setTarget] as const;
}
