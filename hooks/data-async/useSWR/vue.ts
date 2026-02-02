import { onMounted, onUnmounted, ref } from 'vue';

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
 * A Vue composable for SWR (stale-while-revalidate) data fetching
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
  const dataRef = ref<T | undefined>(undefined);
  const errorRef = ref<Error | null>(null);
  const isValidatingRef = ref(false);

  let intervalId: number | null = null;

  const revalidate = async () => {
    if (!key) return;

    isValidatingRef.value = true;
    errorRef.value = null;

    try {
      const fetchedData = await fetcher(key);
      dataRef.value = fetchedData;
    } catch (err) {
      errorRef.value = err instanceof Error ? err : new Error('Unknown error');
    } finally {
      isValidatingRef.value = false;
    }
  };

  onMounted(() => {
    if (key) {
      revalidate();
    }

    if (options.refreshInterval && key) {
      intervalId = window.setInterval(() => {
        revalidate();
      }, options.refreshInterval);
    }
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  const mutate = async (newData?: T) => {
    if (newData !== undefined) {
      dataRef.value = newData;
      return newData;
    }
    await revalidate();
    return dataRef.value;
  };

  return {
    get data() {
      return dataRef.value;
    },
    get error() {
      return errorRef.value;
    },
    get isValidating() {
      return isValidatingRef.value;
    },
    mutate,
  };
}
