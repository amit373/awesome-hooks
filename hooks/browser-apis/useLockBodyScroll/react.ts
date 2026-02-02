import { useEffect } from 'react';

/**
 * Lock or unlock body scroll (e.g. when a modal is open)
 * @param lock - When true, body overflow is hidden; when false, restored
 */
export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!lock) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [lock]);
}
