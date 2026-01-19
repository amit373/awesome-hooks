import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
const type = ref<'info' | 'success' | 'warning' | 'error'>('info');

export function useAlert() {
  const showAlert = (msg: string, t: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    message.value = msg;
    type.value = t;
    isVisible.value = true;
  };

  const hideAlert = () => {
    isVisible.value = false;
  };

  return { isVisible, message, type, showAlert, hideAlert };
}
