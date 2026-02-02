import { onUnmounted, ref, Ref, watch } from 'vue';

interface MutationObserverOptions extends MutationObserverInit {}

interface UseMutationObserverReturn {
  isSupported: Ref<boolean>;
  observe: (target: Node, options?: MutationObserverOptions) => void;
  disconnect: () => void;
  takeRecords: () => MutationRecord[];
}

/**
 * Vue composable for using MutationObserver API
 * @param callback Function to call when mutations occur
 * @param options Mutation observer options
 * @returns Object with observer controls and support status
 */
export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverOptions = { childList: true, subtree: true }
): UseMutationObserverReturn {
  const isSupported = ref(true);
  const observerRef = ref<MutationObserver | null>(null);
  const callbackRef = ref(callback);

  // Update callback ref when callback changes
  watch(
    () => callback,
    newCallback => {
      callbackRef.value = newCallback;
    }
  );

  // Initialize observer
  if (typeof window !== 'undefined' && window.MutationObserver) {
    const observer = new MutationObserver(mutations => {
      callbackRef.value(mutations, observer);
    });

    observerRef.value = observer;
  } else {
    isSupported.value = false;
  }

  onUnmounted(() => {
    if (observerRef.value) {
      observerRef.value.disconnect();
    }
  });

  const observe = (target: Node, observerOptions?: MutationObserverOptions) => {
    if (!observerRef.value || !isSupported.value) return;

    const finalOptions = observerOptions || options;
    observerRef.value.observe(target, finalOptions);
  };

  const disconnect = () => {
    if (observerRef.value) {
      observerRef.value.disconnect();
    }
  };

  const takeRecords = (): MutationRecord[] => {
    if (observerRef.value) {
      return observerRef.value.takeRecords();
    }
    return [];
  };

  return {
    isSupported,
    observe,
    disconnect,
    takeRecords,
  };
}
