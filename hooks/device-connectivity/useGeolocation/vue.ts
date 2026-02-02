import { onUnmounted, ref, shallowRef } from 'vue';

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
 * A Vue composable for accessing geolocation information
 * @param options - Geolocation API options
 * @returns Geolocation data, error status, and control functions
 */
export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const position = shallowRef<GeolocationPosition | null>(null);
  const error = shallowRef<GeolocationError | null>(null);
  const isSupported = ref(true);

  let watchId: number | null = null;

  if (!navigator || !navigator.geolocation) {
    isSupported.value = false;
    error.value = {
      code: 0,
      message: 'Geolocation is not supported',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    } as GeolocationError;
  } else {
    isSupported.value = true;
  }

  const getCurrentPosition = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      pos => {
        position.value = pos;
        error.value = null;
      },
      err => {
        error.value = err as GeolocationError;
        position.value = null;
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0, ...options }
    );
  };

  const watchPosition = () => {
    if (!navigator.geolocation) return;

    watchId = navigator.geolocation.watchPosition(
      pos => {
        position.value = pos;
        error.value = null;
      },
      err => {
        error.value = err as GeolocationError;
        position.value = null;
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

  onUnmounted(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  });

  return {
    position: position.value,
    error: error.value,
    isSupported: isSupported.value,
    getCurrentPosition,
    watchPosition,
    clearWatch,
  };
}
