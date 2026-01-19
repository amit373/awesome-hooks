import { useState, useEffect, useRef } from 'react';

export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
  }
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!ref || !callback) return;

    observer.current = new MutationObserver(callback);
    observer.current.observe(ref, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, callback, options]);

  return [setRef];
}
