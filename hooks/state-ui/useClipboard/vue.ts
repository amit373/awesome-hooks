import { ref } from 'vue';

export function useClipboard() {
  const copiedText = ref<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      copiedText.value = text;
      return true;
    } catch (error) {
      return false;
    }
  };

  return { copiedText, copy };
}
