import { useCallback, useEffect, useState } from 'react';

interface UseSWROptions {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
}

interface UseSWRReturn<T> {
  data: T | undefined;
  error: Error | null;
  isValidating: boolean;
  mutate: (newData?: T) => Promise<T | undefined>;
}

/**
 * A React hook for SWR (stale-while-revalidate) data fetching
 * @param key The cache key for the data
 * @param fetcher The function to fetch data
 * @param options SWR options
 * @returns Data, error, and revalidation state
 */
export function useSWR<T>(
  key: string | null,
  fetcher: (key: string) => Promise<T>,
  options: UseSWROptions = {}
): UseSWRReturn<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const revalidate = useCallback(async () => {
    if (!key) return;

    setIsValidating(true);
    setError(null);

    try {
      const fetchedData = await fetcher(key);
      setData(fetchedData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsValidating(false);
    }
  }, [key, fetcher]);

  useEffect(() => {
    if (key) {
      revalidate();
    }
  }, [key, revalidate]);

  useEffect(() => {
    if (options.refreshInterval && key) {
      const interval = setInterval(() => {
        revalidate();
      }, options.refreshInterval);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [options.refreshInterval, key, revalidate]);

  const mutate = useCallback(
    async (newData?: T) => {
      if (newData !== undefined) {
        setData(newData);
        return newData;
      }
      await revalidate();
      return data;
    },
    [revalidate, data]
  );

  return {
    data,
    error,
    isValidating,
    mutate,
  };
}
