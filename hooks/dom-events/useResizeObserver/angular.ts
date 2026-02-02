import { inject } from '@angular/core';
import { DestroyRef } from '@angular/core';

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
 * Angular function for using Resize Observer API
 * @param options - Resize Observer options
 * @returns Object with dimensions and control methods
 */
export function useResizeObserver({
  box = 'content-box',
}: UseResizeObserverOptions = {}): ResizeObserverResult {
  let width = 0;
  let height = 0;
  let entry: ResizeObserverEntry | undefined;
  let element: Element | null = null;
  let observer: ResizeObserver | null = null;
  const destroyRef = inject(DestroyRef);

  const updateState = (
    w: number,
    h: number,
    observedEntry?: ResizeObserverEntry
  ) => {
    width = w;
    height = h;
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

          updateState(finalWidth, finalHeight, observedEntry);
        }
      });

      observer.observe(elementToObserve, { box });
    } else {
      // Fallback for unsupported browsers
      updateState(elementToObserve.clientWidth, elementToObserve.clientHeight);
    }
  };

  const unobserve = () => {
    cleanup();
    element = null;
  };

  destroyRef.onDestroy(() => {
    cleanup();
  });

  return {
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get entry() {
      return entry;
    },
    observe,
    unobserve,
  };
}
