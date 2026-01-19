import { ref, watch, Ref } from 'vue';

export function useTransition(isActive: Ref<boolean>, duration: number = 300) {
  const stage = ref<'enter' | 'active' | 'exit' | 'unmounted'>(
    isActive.value ? 'active' : 'unmounted'
  );
  const shouldMount = ref(isActive.value);

  watch(isActive, (newVal) => {
    if (newVal) {
      shouldMount.value = true;
      stage.value = 'enter';
      setTimeout(() => {
        stage.value = 'active';
      }, 50);
    } else {
      stage.value = 'exit';
      setTimeout(() => {
        shouldMount.value = false;
        stage.value = 'unmounted';
      }, duration);
    }
  });

  return { shouldMount, stage };
}
