import { onUnmounted, ref, type Ref } from 'vue';

interface UseResizeObserverOptions {
  box?: 'content-box' | 'border-box' | 'device-pixel-content-box';
}

interface ResizeObserverResult {
  width: Ref<number>;
  height: Ref<number>;
  entry: Ref<ResizeObserverEntry | undefined>;
  observe: (element: Element | null) => void;
  unobserve: () => void;
}

/**
 * Vue composable for using Resize Observer API
 * @param options - Resize Observer options
 * @returns Object with dimensions and control methods
 */
export function useResizeObserver({
  box = 'content-box',
}: UseResizeObserverOptions = {}): ResizeObserverResult {
  const width = ref(0);
  const height = ref(0);
  const entry = ref<ResizeObserverEntry>();
  const elementRef = ref<Element | null>(null);
  let observer: ResizeObserver | null = null;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const observe = (element: Element | null) => {
    if (!element) {
      return;
    }

    if (elementRef.value === element) {
      return;
    }

    cleanup();
    elementRef.value = element;

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(([observedEntry]) => {
        if (observedEntry) {
          const boxSize = Array.isArray(observedEntry.borderBoxSize)
            ? observedEntry.borderBoxSize[0]
            : observedEntry.borderBoxSize;

          const contentBoxSize = Array.isArray(observedEntry.contentBoxSize)
            ? observedEntry.contentBoxSize[0]
            : observedEntry.contentBoxSize;

          const finalWidth =
            box === 'border-box'
              ? boxSize?.inlineSize || 0
              : contentBoxSize?.inlineSize || 0;

          const finalHeight =
            box === 'border-box'
              ? boxSize?.blockSize || 0
              : contentBoxSize?.blockSize || 0;

          width.value = finalWidth;
          height.value = finalHeight;
          entry.value = observedEntry;
        }
      });

      observer.observe(element, { box });
    } else {
      // Fallback for unsupported browsers
      width.value = element.clientWidth;
      height.value = element.clientHeight;
    }
  };

  const unobserve = () => {
    cleanup();
    elementRef.value = null;
  };

  onUnmounted(() => {
    cleanup();
  });

  return {
    width,
    height,
    entry,
    observe,
    unobserve,
  };
}
