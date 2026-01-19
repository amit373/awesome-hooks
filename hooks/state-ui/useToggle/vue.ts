import { ref, readonly } from 'vue';

export function useToggle(initialValue: boolean = false) {
  const value = ref(initialValue);

  const toggle = (nextValue?: boolean | Event) => {
    if (typeof nextValue === 'boolean') {
      value.value = nextValue;
    } else {
      value.value = !value.value;
    }
  };

  return {
    value: readonly(value),
    toggle
  };
}
