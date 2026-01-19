import { ref, onMounted, onUnmounted } from 'vue';

export function useGeoLocation(options?: PositionOptions) {
  const location = ref<GeolocationCoordinates | null>(null);
  const error = ref<GeolocationPositionError | null>(null);
  let watchId: number | null = null;

  onMounted(() => {
    if (!navigator.geolocation) {
      error.value = { message: 'Geolocation not supported' } as GeolocationPositionError;
      return;
    }

    watchId = navigator.geolocation.watchPosition(
      (pos) => { location.value = pos.coords; },
      (err) => { error.value = err; },
      options
    );
  });

  onUnmounted(() => {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  });

  return { location, error };
}
