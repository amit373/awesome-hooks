import { Injectable, OnDestroy, signal } from '@angular/core';

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
 * An Angular service for accessing geolocation information
 * @param options - Geolocation API options
 * @returns Geolocation data, error status, and control functions
 */
@Injectable({ providedIn: 'root' })
export class GeolocationService implements OnDestroy {
  private positionSignal = signal<GeolocationPosition | null>(null);
  private errorSignal = signal<GeolocationError | null>(null);
  private isSupportedSignal = signal(true);

  readonly position$ = this.positionSignal.asReadonly();
  readonly error$ = this.errorSignal.asReadonly();
  readonly isSupported$ = this.isSupportedSignal.asReadonly();

  private watchId: number | null = null;

  constructor(options: UseGeolocationOptions = {}) {
    if (!navigator || !navigator.geolocation) {
      this.isSupportedSignal.set(false);
      this.errorSignal.set({
        code: 0,
        message: 'Geolocation is not supported',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      } as GeolocationError);
    } else {
      this.isSupportedSignal.set(true);
    }
  }

  /**
   * Get current position once
   */
  getCurrentPosition(options: UseGeolocationOptions = {}): void {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      pos => {
        this.positionSignal.set(pos);
        this.errorSignal.set(null);
      },
      err => {
        this.errorSignal.set(err as GeolocationError);
        this.positionSignal.set(null);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0, ...options }
    );
  }

  /**
   * Watch position for continuous updates
   */
  watchPosition(options: UseGeolocationOptions = {}): void {
    if (!navigator.geolocation) return;

    this.watchId = navigator.geolocation.watchPosition(
      pos => {
        this.positionSignal.set(pos);
        this.errorSignal.set(null);
      },
      err => {
        this.errorSignal.set(err as GeolocationError);
        this.positionSignal.set(null);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0, ...options }
    );
  }

  /**
   * Clear the position watch
   */
  clearWatch(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  ngOnDestroy(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}

/**
 * Factory function to create a GeolocationService instance
 * @param options - Geolocation API options
 * @returns Geolocation data, error status, and control functions
 */
export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const service = new GeolocationService(options);

  return {
    get position() {
      return service.position$();
    },
    get error() {
      return service.error$();
    },
    get isSupported() {
      return service.isSupported$();
    },
    getCurrentPosition: (opts: UseGeolocationOptions = {}) =>
      service.getCurrentPosition(opts),
    watchPosition: (opts: UseGeolocationOptions = {}) =>
      service.watchPosition(opts),
    clearWatch: () => service.clearWatch(),
  };
}
