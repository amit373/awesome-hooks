import { signal, computed } from '@angular/core';

interface UseFetchOptions extends RequestInit {
  manual?: boolean;
  initialData?: any;
  refetchOnWindowFocus?: boolean;
}

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  abort: () => void;
}

/**
 * Angular function for handling fetch requests with loading/error states
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Object with data, loading, error states and refetch/abort functions
 */
export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const dataSignal = signal<T | null>(options.initialData || null);
  const loadingSignal = signal<boolean>(false);
  const errorSignal = signal<Error | null>(null);
  let controller: AbortController | null = null;

  const fetchData = async () => {
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    try {
      loadingSignal.set(true);
      errorSignal.set(null);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (!controller.signal.aborted) {
        dataSignal.set(result);
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        errorSignal.set(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      loadingSignal.set(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  const abort = () => {
    if (controller) {
      controller.abort();
    }
  };

  if (!options.manual) {
    fetchData();
  }

  // Add event listener for window focus to refetch if configured
  if (options.refetchOnWindowFocus) {
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);

    // Note: This implementation assumes it will be called in a component context
    // where cleanup can be handled appropriately
  }

  return {
    get data() {
      return dataSignal();
    },
    get loading() {
      return loadingSignal();
    },
    get error() {
      return errorSignal();
    },
    refetch,
    abort,
  };
}
