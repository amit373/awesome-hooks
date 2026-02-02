import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';

interface SpringConfig {
  tension?: number;
  friction?: number;
  precision?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpringService implements OnDestroy {
  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private animationFrameId: number | null = null;

  useSpring(
    initialValues: Record<string, number>,
    config: SpringConfig = {}
  ): [
    WritableSignal<Record<string, number>>,
    (values: Partial<Record<string, number>>) => void,
  ] {
    const { tension = 170, friction = 26, precision = 0.01 } = config;

    const animatedValues = signal<Record<string, number>>({ ...initialValues });
    const targetValues = { ...initialValues };
    const velocityValues: Record<string, number> = Object.keys(
      initialValues
    ).reduce(
      (acc, key) => {
        acc[key] = 0;
        return acc;
      },
      {} as Record<string, number>
    );

    const update = () => {
      let shouldUpdate = false;
      const newCurrent: Record<string, number> = {};
      const newVelocity: Record<string, number> = {};

      for (const key in targetValues) {
        const targetVal = targetValues[key] ?? 0;
        const currentVal = animatedValues()[key] ?? 0;
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

      // Update signal values
      animatedValues.set({ ...animatedValues(), ...newCurrent });

      // Update velocity values
      for (const key in newVelocity) {
        velocityValues[key] = newVelocity[key]!;
      }

      if (shouldUpdate) {
        this.animationFrameId = requestAnimationFrame(update);
      }
    };

    const setTarget = (values: Partial<Record<string, number>>) => {
      Object.assign(targetValues, values);
      if (this.animationFrameId === null) {
        this.animationFrameId = requestAnimationFrame(update);
      }
    };

    // Start animation
    this.animationFrameId = requestAnimationFrame(update);

    return [animatedValues, setTarget];
  }
}

// For standalone usage outside of DI
export function useSpring(
  initialValues: Record<string, number>,
  config: SpringConfig = {}
) {
  const service = new SpringService();
  return service.useSpring(initialValues, config);
}
