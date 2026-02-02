import { DestroyRef, inject } from '@angular/core';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

interface IntersectionObserverResult {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
  observe: (element: Element | null) => void;
  unobserve: () => void;
}

/**
 * Angular function for using Intersection Observer API
 * @param options - Intersection Observer options
 * @returns Object with intersection status and control methods
 */
export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
}: UseIntersectionObserverOptions = {}): IntersectionObserverResult {
  let isIntersecting = false;
  let entry: IntersectionObserverEntry | undefined;
  let element: Element | null = null;
  let observer: IntersectionObserver | null = null;
  const destroyRef = inject(DestroyRef);

  const updateState = (
    intersecting: boolean,
    observedEntry?: IntersectionObserverEntry
  ) => {
    isIntersecting = intersecting;
    entry = observedEntry;
  };

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const observe = (elementToObserve: Element | null) => {
    if (!elementToObserve) {
      return;
    }

    if (element === elementToObserve) {
      return;
    }

    cleanup();
    element = elementToObserve;

    if (!elementToObserve) {
      return;
    }

    const thresholds = Array.isArray(threshold) ? threshold : [threshold];

    observer = new IntersectionObserver(
      ([observedEntry]) => {
        if (observedEntry) {
          updateState(observedEntry.isIntersecting, observedEntry);
        }
      },
      { threshold: thresholds, root, rootMargin }
    );

    observer.observe(elementToObserve);
  };

  const unobserve = () => {
    cleanup();
    element = null;
  };

  destroyRef.onDestroy(() => {
    cleanup();
  });

  return {
    get isIntersecting() {
      return isIntersecting;
    },
    get entry() {
      return entry;
    },
    observe,
    unobserve,
  };
}
