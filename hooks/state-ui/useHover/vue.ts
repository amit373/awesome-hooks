import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export function useHover(elementRef: Ref<HTMLElement | null>) {
  const isHovered = ref(false);

  const onEnter = () => isHovered.value = true;
  const onLeave = () => isHovered.value = false;

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener('mouseenter', onEnter);
      elementRef.value.addEventListener('mouseleave', onLeave);
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mouseenter', onEnter);
      elementRef.value.removeEventListener('mouseleave', onLeave);
    }
  });

  return isHovered;
}
