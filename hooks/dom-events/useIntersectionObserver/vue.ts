import { onUnmounted, ref, type Ref } from 'vue';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

interface IntersectionObserverResult {
  isIntersecting: Ref<boolean>;
  entry: Ref<IntersectionObserverEntry | undefined>;
  observe: (element: Element | null) => void;
  unobserve: () => void;
}

/**
 * Vue composable for using Intersection Observer API
 * @param options - Intersection Observer options
 * @returns Object with intersection status and control methods
 */
export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
}: UseIntersectionObserverOptions = {}): IntersectionObserverResult {
  const isIntersecting = ref(false);
  const entry = ref<IntersectionObserverEntry>();
  const elementRef = ref<Element | null>(null);
  let observer: IntersectionObserver | null = null;

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

    if (!element) {
      return;
    }

    const thresholds = Array.isArray(threshold) ? threshold : [threshold];

    observer = new IntersectionObserver(
      ([observedEntry]) => {
        if (observedEntry) {
          isIntersecting.value = observedEntry.isIntersecting;
          entry.value = observedEntry;
        }
      },
      { threshold: thresholds, root, rootMargin }
    );

    observer.observe(element);
  };

  const unobserve = () => {
    cleanup();
    elementRef.value = null;
  };

  onUnmounted(() => {
    cleanup();
  });

  return {
    isIntersecting,
    entry,
    observe,
    unobserve,
  };
}
