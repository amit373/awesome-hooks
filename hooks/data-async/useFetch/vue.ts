import { onUnmounted, ref, type Ref } from 'vue';

interface UseFetchOptions extends RequestInit {
  manual?: boolean;
  initialData?: any;
  refetchOnWindowFocus?: boolean;
}

interface UseFetchReturn<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  refetch: () => void;
  abort: () => void;
}

/**
 * Vue composable for handling fetch requests with loading/error states
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Object with data, loading, error states and refetch/abort functions
 */
export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const data = ref<T | null>(options.initialData || null);
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  let controller: AbortController | null = null;
  let mounted = true;

  const fetchData = async () => {
    if (!mounted) return;

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();

    try {
      loading.value = true;
      error.value = null;

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (mounted && !controller.signal.aborted) {
        data.value = result;
      }
    } catch (err) {
      if (
        mounted &&
        !(err instanceof DOMException && err.name === 'AbortError')
      ) {
        error.value = err instanceof Error ? err : new Error(String(err));
      }
    } finally {
      if (mounted) {
        loading.value = false;
      }
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

    onUnmounted(() => {
      window.removeEventListener('focus', handleFocus);
    });
  }

  onUnmounted(() => {
    mounted = false;
    if (controller) {
      controller.abort();
    }
  });

  return {
    data: data as Ref<T | null>,
    loading,
    error,
    refetch,
    abort,
  };
}
