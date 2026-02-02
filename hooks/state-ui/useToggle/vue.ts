import { ref, Ref } from 'vue';

/**
 * Toggle hook for boolean state management
 * @param initialValue - Initial boolean value (default: false)
 * @returns Object with value, toggle, and setValue
 */
export function useToggle(initialValue = false) {
  const value: Ref<boolean> = ref(initialValue);

  const toggle = () => {
    value.value = !value.value;
  };

  const setValue = (newValue: boolean) => {
    value.value = newValue;
  };

  return {
    value,
    toggle,
    setValue,
  };
}
