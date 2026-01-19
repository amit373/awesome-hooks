import { useState, useEffect } from 'react';

export function useGeoLocation(options?: PositionOptions) {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ message: 'Geolocation not supported' } as GeolocationPositionError);
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => setLocation(pos.coords),
      (err) => setError(err),
      options
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { location, error };
}
