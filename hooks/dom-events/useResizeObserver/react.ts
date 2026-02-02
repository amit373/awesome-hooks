import { useState, useEffect, useRef, useCallback } from 'react';

interface UseResizeObserverOptions {
  box?: 'content-box' | 'border-box' | 'device-pixel-content-box';
}

interface ResizeObserverResult {
  width: number;
  height: number;
  entry?: ResizeObserverEntry;
  observe: (element: Element | null) => void;
  unobserve: () => void;
}

/**
 * React hook for using Resize Observer API
 * @param options - Resize Observer options
 * @returns Object with dimensions and control methods
 */
export function useResizeObserver({
  box = 'content-box',
}: UseResizeObserverOptions = {}): ResizeObserverResult {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [entry, setEntry] = useState<ResizeObserverEntry>();
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

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

      if (typeof ResizeObserver !== 'undefined') {
        observerRef.current = new ResizeObserver(([entry]) => {
          if (entry) {
            const boxSize = Array.isArray(entry.borderBoxSize)
              ? entry.borderBoxSize[0]
              : entry.borderBoxSize;

            const contentBoxSize = Array.isArray(entry.contentBoxSize)
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize;

            const finalWidth =
              box === 'border-box'
                ? boxSize?.inlineSize || 0
                : contentBoxSize?.inlineSize || 0;

            const finalHeight =
              box === 'border-box'
                ? boxSize?.blockSize || 0
                : contentBoxSize?.blockSize || 0;

            setWidth(finalWidth);
            setHeight(finalHeight);
            setEntry(entry);
          }
        });

        observerRef.current.observe(element, { box });
      } else {
        // Fallback for unsupported browsers
        setWidth(element.clientWidth);
        setHeight(element.clientHeight);
      }
    },
    [box, cleanup]
  );

  const unobserve = useCallback(() => {
    cleanup();
    elementRef.current = null;
  }, [cleanup]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    width,
    height,
    entry,
    observe,
    unobserve,
  };
}
