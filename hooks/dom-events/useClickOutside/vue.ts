import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Vue composable that fires a callback when a click occurs outside the specified element
 * @param callback - Function to call when click outside occurs
 * @returns Ref to attach to the element to watch
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
) {
  const elementRef = ref<T | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return elementRef;
}
