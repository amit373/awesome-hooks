import { useCallback, useEffect, useRef, useState } from 'react';

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
 * React hook for using Intersection Observer API
 * @param options - Intersection Observer options
 * @returns Object with intersection status and control methods
 */
export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
}: UseIntersectionObserverOptions = {}): IntersectionObserverResult {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const observe = useCallback(
    (element: Element | null) => {
      if (!element) {
        return;
      }

      if (elementRef.current === element) {
        return;
      }

      cleanup();
      elementRef.current = element;

      if (!element) {
        return;
      }

      const thresholds = Array.isArray(threshold) ? threshold : [threshold];

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry) {
            setIsIntersecting(entry.isIntersecting);
            setEntry(entry);
          }
        },
        { threshold: thresholds, root, rootMargin }
      );

      observerRef.current.observe(element);
    },
    [threshold, root, rootMargin, cleanup]
  );

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    elementRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isIntersecting,
    entry,
    observe,
    unobserve,
  };
}
