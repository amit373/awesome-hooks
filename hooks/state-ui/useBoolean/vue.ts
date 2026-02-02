import { ref } from 'vue';

interface UseBooleanReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

/**
 * A Vue composable for managing boolean state with convenience methods
 * @param initialValue The initial boolean value
 * @returns Object with boolean value and helper methods
 */
export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const value = ref<boolean>(initialValue);

  const toggle = () => {
    value.value = !value.value;
  };

  const setTrue = () => {
    value.value = true;
  };

  const setFalse = () => {
    value.value = false;
  };

  return {
    value: value.value,
    toggle,
    setTrue,
    setFalse,
    setValue: (newValue: boolean) => {
      value.value = newValue;
    },
  };
}
