import { ref, onMounted, onUnmounted } from 'vue';

export function useDeviceOrientation() {
  const orientation = ref<{ alpha: number | null; beta: number | null; gamma: number | null }>({
    alpha: null,
    beta: null,
    gamma: null,
  });

  const handleOrientation = (event: DeviceOrientationEvent) => {
    orientation.value = {
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    };
  };

  onMounted(() => {
    window.addEventListener('deviceorientation', handleOrientation, true);
  });

  onUnmounted(() => {
    window.removeEventListener('deviceorientation', handleOrientation, true);
  });

  return orientation;
}
