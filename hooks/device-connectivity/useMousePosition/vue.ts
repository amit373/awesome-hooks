import { onMounted, onUnmounted, ref } from 'vue';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * A Vue composable for tracking mouse position
 * @returns Object containing x and y coordinates of the mouse
 */
export function useMousePosition(): MousePosition {
  const position = ref<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    position.value = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
  });

  return position.value;
}
