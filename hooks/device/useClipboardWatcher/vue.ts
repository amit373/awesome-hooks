import { ref, onMounted, onUnmounted } from 'vue';

export function useClipboardWatcher() {
  const clipboardContent = ref('');
  let intervalId: any;

  const checkClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text !== clipboardContent.value) {
        clipboardContent.value = text;
      }
    } catch (err) {}
  };

  onMounted(() => {
    intervalId = setInterval(checkClipboard, 1000);
    window.addEventListener('focus', checkClipboard);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
    window.removeEventListener('focus', checkClipboard);
  });

  return clipboardContent;
}
