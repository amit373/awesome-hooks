import { useCallback, useEffect, useRef, useState } from 'react';

interface MutationObserverOptions extends MutationObserverInit {}

interface UseMutationObserverReturn {
  isSupported: boolean;
  observe: (target: Node, options?: MutationObserverOptions) => void;
  disconnect: () => void;
  takeRecords: () => MutationRecord[];
}

/**
 * React hook for using MutationObserver API
 * @param callback Function to call when mutations occur
 * @param options Mutation observer options
 * @returns Object with observer controls and support status
 */
export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverOptions = { childList: true, subtree: true }
): UseMutationObserverReturn {
  const [isSupported, setIsSupported] = useState(true);
  const observerRef = useRef<MutationObserver | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Initialize observer
  useEffect(() => {
    if (typeof window === 'undefined' || !window.MutationObserver) {
      setIsSupported(false);
      return;
    }

    const observer = new MutationObserver(mutations => {
      callbackRef.current(mutations, observer);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const observe = useCallback(
    (target: Node, observerOptions?: MutationObserverOptions) => {
      if (!observerRef.current || !isSupported) return;

      const finalOptions = observerOptions || options;
      observerRef.current.observe(target, finalOptions);
    },
    [isSupported, options]
  );

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  const takeRecords = useCallback((): MutationRecord[] => {
    if (observerRef.current) {
      return observerRef.current.takeRecords();
    }
    return [];
  }, []);

  return {
    isSupported,
    observe,
    disconnect,
    takeRecords,
  };
}
