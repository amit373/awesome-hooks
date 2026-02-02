import { onUnmounted, ref, shallowRef, watch } from 'vue';

interface AsyncState<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

import { Ref } from 'vue';

interface UseAsyncReturn<T> {
  data: Ref<T | undefined>;
  error: Ref<Error | undefined>;
  loading: Ref<boolean>;
  run: (promise: Promise<T>) => void;
  reset: () => void;
}

/**
 * A Vue composable for handling asynchronous operations
 * @param asyncFunction The asynchronous function to execute
 * @param deps Dependencies that trigger a re-run of the async function
 * @returns Async state and control functions
 */
export function useAsync<T>(
  asyncFunction?: () => Promise<T>,
  deps?: any[]
): UseAsyncReturn<T> {
  const data = shallowRef<T | undefined>(undefined);
  const error = shallowRef<Error | undefined>(undefined);
  const loading = ref<boolean>(false);

  let mounted = true;
  let promiseRef: Promise<T> | null = null;

  const run = (promise: Promise<T>) => {
    // Cancel previous promise if exists
    promiseRef = promise;

    data.value = undefined;
    error.value = undefined;
    loading.value = true;

    promise.then(
      result => {
        // Only update state if the component is still mounted and this is the latest promise
        if (mounted && promiseRef === promise) {
          data.value = result;
          error.value = undefined;
          loading.value = false;
        }
      },
      err => {
        // Only update state if the component is still mounted and this is the latest promise
        if (mounted && promiseRef === promise) {
          data.value = undefined;
          error.value = err instanceof Error ? err : new Error(String(err));
          loading.value = false;
        }
      }
    );
  };

  const reset = () => {
    data.value = undefined;
    error.value = undefined;
    loading.value = false;
  };

  // Execute the async function when deps change
  if (deps && asyncFunction) {
    watch(
      () => deps,
      () => {
        if (asyncFunction) {
          run(asyncFunction());
        }
      },
      { immediate: true }
    );
  } else if (asyncFunction) {
    // Execute immediately if no deps provided
    run(asyncFunction());
  }

  onUnmounted(() => {
    mounted = false;
  });

  return {
    data,
    error,
    loading,
    run,
    reset,
  };
}
