import { useState, useEffect } from 'react';

interface DeviceOrientation {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<DeviceOrientation>({ alpha: null, beta: null, gamma: null });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, []);

  return orientation;
}
