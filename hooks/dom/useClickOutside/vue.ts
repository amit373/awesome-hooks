import { onMounted, onUnmounted, Ref } from 'vue';

export function useClickOutside(elementRef: Ref<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  const listener = (event: MouseEvent | TouchEvent) => {
    if (!elementRef.value || elementRef.value.contains(event.target as Node)) {
      return;
    }
    handler(event);
  };

  onMounted(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
  });
}
