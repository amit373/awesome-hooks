import { ref, watch, onMounted } from 'vue';

export function useDarkMode() {
  const isDark = ref(false);

  onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark.value = prefersDark;
  });

  watch(isDark, (val) => {
    if (val) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });

  const toggle = () => isDark.value = !isDark.value;

  return { isDark, toggle };
}
