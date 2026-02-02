import { Injectable, OnDestroy, signal } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class SWRService implements OnDestroy {
  ngOnDestroy(): void {
    // Clean up intervals if any
  }

  /**
   * An Angular service for SWR (stale-while-revalidate) data fetching
   * @param key The cache key for the data
   * @param fetcher The function to fetch data
   * @param options SWR options
   * @returns Data, error, and revalidation state
   */
  useSWR<T>(
    key: string | null,
    fetcher: (key: string) => Promise<T>,
    options: UseSWROptions = {}
  ): UseSWRReturn<T> {
    const dataSignal = signal<T | undefined>(undefined);
    const errorSignal = signal<Error | null>(null);
    const isValidatingSignal = signal<boolean>(false);

    let intervalId: number | null = null;

    const revalidate = async () => {
      if (!key) return;

      isValidatingSignal.set(true);
      errorSignal.set(null);

      try {
        const fetchedData = await fetcher(key);
        dataSignal.set(fetchedData);
      } catch (err) {
        errorSignal.set(
          err instanceof Error ? err : new Error('Unknown error')
        );
      } finally {
        isValidatingSignal.set(false);
      }
    };

    if (key) {
      revalidate();
    }

    if (options.refreshInterval && key) {
      intervalId = window.setInterval(() => {
        revalidate();
      }, options.refreshInterval);
    }

    const mutate = async (newData?: T) => {
      if (newData !== undefined) {
        dataSignal.set(newData);
        return newData;
      }
      await revalidate();
      return dataSignal();
    };

    return {
      get data() {
        return dataSignal();
      },
      get error() {
        return errorSignal();
      },
      get isValidating() {
        return isValidatingSignal();
      },
      mutate,
    };
  }
}

// Standalone hook function for use outside of DI
export function useSWR<T>(
  key: string | null,
  fetcher: (key: string) => Promise<T>,
  options: UseSWROptions = {}
) {
  const service = new SWRService();
  return service.useSWR(key, fetcher, options);
}
