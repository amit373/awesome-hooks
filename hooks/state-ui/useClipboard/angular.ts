import { DestroyRef, inject, signal, WritableSignal } from '@angular/core';

interface UseClipboardReturn {
  copied: WritableSignal<boolean>;
  copy: (text: string) => Promise<boolean>;
  error: WritableSignal<Error | null>;
}

/**
 * Copy text to clipboard with success/error state
 * @returns Object with copied signal, copy function, and error signal
 */
export function useClipboard(): UseClipboardReturn {
  const copied = signal(false);
  const error = signal<Error | null>(null);
  const destroyRef = inject(DestroyRef);
  let resetTimeout: ReturnType<typeof setTimeout> | null = null;

  const copy = async (text: string): Promise<boolean> => {
    try {
      error.set(null);
      if (typeof navigator?.clipboard?.writeText !== 'function') {
        throw new Error('Clipboard API not available');
      }
      await navigator.clipboard.writeText(text);
      if (resetTimeout) clearTimeout(resetTimeout);
      copied.set(true);
      resetTimeout = setTimeout(() => {
        copied.set(false);
      }, 2000);
      return true;
    } catch (err) {
      error.set(err instanceof Error ? err : new Error(String(err)));
      copied.set(false);
      return false;
    }
  };

  destroyRef.onDestroy(() => {
    if (resetTimeout) clearTimeout(resetTimeout);
  });

  return { copied, copy, error };
}
