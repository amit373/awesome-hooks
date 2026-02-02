import { useState, useEffect } from 'react';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
  PERMISSION_DENIED: 1;
  POSITION_UNAVAILABLE: 2;
  TIMEOUT: 3;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface UseGeolocationReturn {
  position: GeolocationPosition | null;
  error: GeolocationError | null;
  isSupported: boolean;
  getCurrentPosition: () => void;
  watchPosition: () => void;
  clearWatch: () => void;
}

/**
 * React hook for accessing geolocation information
 * @param options - Geolocation API options
 * @returns Geolocation data, error status, and control functions
 */
export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  let watchId: number | null = null;

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setIsSupported(false);
      setError({
        code: 0,
        message: 'Geolocation is not supported',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationError);
      return;
    }

    setIsSupported(true);
  }, []);

  const getCurrentPosition = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      pos => {
        setPosition(pos);
        setError(null);
      },
      err => {
        setError(err as GeolocationError);
        setPosition(null);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0, ...options }
    );
  };

  const watchPosition = () => {
    if (!navigator.geolocation) return;

    watchId = navigator.geolocation.watchPosition(
      pos => {
        setPosition(pos);
        setError(null);
      },
      err => {
        setError(err as GeolocationError);
        setPosition(null);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0, ...options }
    );
  };

  const clearWatch = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return {
    position,
    error,
    isSupported,
    getCurrentPosition,
    watchPosition,
    clearWatch,
  };
}
