import { ref } from 'vue';

export function useFocus() {
  const elementRef = ref<HTMLElement | null>(null);
  const isFocused = ref(false);

  const focus = () => {
    if (elementRef.value) {
      elementRef.value.focus();
    }
  };

  const onFocus = () => {
    isFocused.value = true;
  };

  const onBlur = () => {
    isFocused.value = false;
  };

  return { elementRef, isFocused, focus, onFocus, onBlur };
}
