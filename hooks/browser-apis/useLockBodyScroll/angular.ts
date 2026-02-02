import { DestroyRef, effect, inject } from '@angular/core';

/**
 * Lock or unlock body scroll (e.g. when a modal is open)
 * @param lock - Getter: when true, body overflow is hidden; when false, restored
 */
export function useLockBodyScroll(lock: () => boolean): void {
  const destroyRef = inject(DestroyRef);
  let prev: string | null = null;

  effect(() => {
    const shouldLock = lock();
    if (typeof document === 'undefined') return;
    if (shouldLock) {
      prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (prev !== null) {
      document.body.style.overflow = prev;
      prev = null;
    }
  });

  destroyRef.onDestroy(() => {
    if (prev !== null && typeof document !== 'undefined') {
      document.body.style.overflow = prev;
    }
  });
}
