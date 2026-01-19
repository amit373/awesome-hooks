import { ref, watch } from 'vue';

export function useSnackbar(autoHideDuration = 6000) {
  const isOpen = ref(false);
  const message = ref('');

  const openSnackbar = (msg: string) => {
    message.value = msg;
    isOpen.value = true;
  };

  const closeSnackbar = () => {
    isOpen.value = false;
  };

  watch(isOpen, (val) => {
    if (val && autoHideDuration > 0) {
      setTimeout(() => {
        isOpen.value = false;
      }, autoHideDuration);
    }
  });

  return { isOpen, message, openSnackbar, closeSnackbar };
}
