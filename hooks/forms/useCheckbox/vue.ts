import { ref } from 'vue';

export function useCheckbox(initialValue: boolean = false) {
  const checked = ref(initialValue);
  const toggle = () => checked.value = !checked.value;
  return { checked, toggle };
}
