import { ref, Ref, onUnmounted } from 'vue';

interface UseClipboardReturn {
  copied: Ref<boolean>;
  copy: (text: string) => Promise<boolean>;
  error: Ref<Error | null>;
}

/**
 * Copy text to clipboard with success/error state
 * @returns Object with copied ref, copy function, and error ref
 */
export function useClipboard(): UseClipboardReturn {
  const copied = ref(false);
  const error = ref<Error | null>(null);
  let resetTimeout: ReturnType<typeof setTimeout> | null = null;

  const copy = async (text: string): Promise<boolean> => {
    try {
      error.value = null;
      if (typeof navigator?.clipboard?.writeText !== 'function') {
        throw new Error('Clipboard API not available');
      }
      await navigator.clipboard.writeText(text);
      if (resetTimeout) clearTimeout(resetTimeout);
      copied.value = true;
      resetTimeout = setTimeout(() => {
        copied.value = false;
      }, 2000);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      copied.value = false;
      return false;
    }
  };

  onUnmounted(() => {
    if (resetTimeout) clearTimeout(resetTimeout);
  });

  return { copied, copy, error };
}
