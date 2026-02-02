import { watch, onUnmounted } from 'vue';

/**
 * Lock or unlock body scroll (e.g. when a modal is open)
 * @param lock - Ref or getter: when true, body overflow is hidden; when false, restored
 */
export function useLockBodyScroll(lock: () => boolean): void {
  let prev: string | null = null;

  const apply = (shouldLock: boolean) => {
    if (typeof document === 'undefined') return;
    if (shouldLock) {
      prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else if (prev !== null) {
      document.body.style.overflow = prev;
      prev = null;
    }
  };

  const stop = watch(lock, (shouldLock) => {
    apply(shouldLock);
  }, { immediate: true });

  onUnmounted(() => {
    stop();
    if (prev !== null && typeof document !== 'undefined') {
      document.body.style.overflow = prev;
    }
  });
}
