import { useState, useCallback, useRef, useEffect } from 'react';

interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: Error | null;
}

/**
 * Copy text to clipboard with success/error state
 * @returns Object with copied state, copy function, and error
 */
export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      setError(null);
      if (typeof window === 'undefined' || typeof navigator?.clipboard?.writeText !== 'function') {
        throw new Error('Clipboard API not available');
      }
      await navigator.clipboard.writeText(text);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      setCopied(true);
      resetTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      setCopied(false);
      return false;
    }
  }, []);

  return { copied, copy, error };
}
