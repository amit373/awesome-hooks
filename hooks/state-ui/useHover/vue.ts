import { onUnmounted, ref, Ref, watch } from 'vue';

/**
 * Track hover state for an element
 * @returns Object with ref to attach and isHovered ref
 */
export function useHover<T extends HTMLElement = HTMLElement>(): {
  ref: Ref<T | null>;
  isHovered: Ref<boolean>;
} {
  const elementRef = ref<T | null>(null);
  const isHovered = ref(false);

  const handleMouseEnter = () => {
    isHovered.value = true;
  };

  const handleMouseLeave = () => {
    isHovered.value = false;
  };

  const stopWatch = watch(
    elementRef,
    (node, _, onCleanup) => {
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
        onCleanup(() => {
          node.removeEventListener('mouseenter', handleMouseEnter);
          node.removeEventListener('mouseleave', handleMouseLeave);
        });
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    stopWatch();
    const node = elementRef.value;
    if (node) {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    }
  });

  return { ref: elementRef as Ref<T | null>, isHovered };
}
