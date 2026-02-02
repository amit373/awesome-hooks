import { useCallback, useEffect, useRef, useState } from 'react';

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
 * React hook for handling fetch requests with loading/error states
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Object with data, loading, error states and refetch/abort functions
 */
export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(options.initialData ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchData = useCallback(async () => {
    if (!mountedRef.current) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const opts = optionsRef.current;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...opts,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (mountedRef.current && !controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (
        mountedRef.current &&
        !(err instanceof DOMException && err.name === 'AbortError')
      ) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const abort = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }, []);

  const manual = options.manual;
  useEffect(() => {
    mountedRef.current = true;

    if (!manual) {
      fetchData();
    }

    return () => {
      mountedRef.current = false;
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [url, manual, fetchData]);

  // Add event listener for window focus to refetch if configured
  const refetchOnWindowFocus = options.refetchOnWindowFocus;
  useEffect(() => {
    if (refetchOnWindowFocus) {
      const handleFocus = () => {
        refetch();
      };

      window.addEventListener('focus', handleFocus);
      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    }
    return undefined;
  }, [refetchOnWindowFocus, refetch]);

  return {
    data,
    loading,
    error,
    refetch,
    abort,
  };
}
