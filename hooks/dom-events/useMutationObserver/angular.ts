import { Injectable, OnDestroy } from '@angular/core';

interface MutationObserverOptions extends MutationObserverInit {}

interface UseMutationObserverReturn {
  isSupported: boolean;
  observe: (target: Node, options?: MutationObserverOptions) => void;
  disconnect: () => void;
  takeRecords: () => MutationRecord[];
}

@Injectable({
  providedIn: 'root',
})
export class MutationObserverService implements OnDestroy {
  private observer: MutationObserver | null = null;
  private options: MutationObserverOptions = { childList: true, subtree: true };
  private callback: MutationCallback | null = null;
  private cleanupObserver: (() => void) | null = null;

  constructor() {}

  ngOnDestroy(): void {
    if (this.cleanupObserver) {
      this.cleanupObserver();
    }
  }

  /**
   * Angular service method for using MutationObserver API
   * @param callback Function to call when mutations occur
   * @param options Mutation observer options
   * @returns Object with observer controls and support status
   */
  useMutationObserver(
    callback: MutationCallback,
    options: MutationObserverOptions = { childList: true, subtree: true }
  ): UseMutationObserverReturn {
    this.options = options;
    const isSupported =
      typeof window !== 'undefined' && !!window.MutationObserver;

    if (isSupported && !this.observer) {
      this.observer = new MutationObserver(mutations => {
        callback(mutations, this.observer!);
      });
    }

    const observe = (
      target: Node,
      observerOptions?: MutationObserverOptions
    ) => {
      if (!this.observer || !isSupported) return;

      const finalOptions = observerOptions || options;
      this.observer.observe(target, finalOptions);
    };

    const disconnect = () => {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    };

    // Store disconnect function to use in cleanup
    this.cleanupObserver = disconnect;

    const takeRecords = (): MutationRecord[] => {
      if (this.observer) {
        return this.observer.takeRecords();
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
}

// Standalone hook function for use outside of DI
export function useMutationObserver(
  callback: MutationCallback,
  options: MutationObserverOptions = { childList: true, subtree: true }
) {
  const service = new MutationObserverService();
  return service.useMutationObserver(callback, options);
}
