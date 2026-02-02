import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncState<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

interface UseAsyncReturn<T> {
  data?: T;
  error?: Error;
  loading: boolean;
  run: (promise: Promise<T>) => void;
  reset: () => void;
}

/**
 * A React hook for handling asynchronous operations
 * @param asyncFunction The asynchronous function to execute
 * @param deps Dependencies that trigger a re-run of the async function
 * @returns Async state and control functions
 */
export function useAsync<T>(
  asyncFunction?: () => Promise<T>,
  deps: React.DependencyList = []
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const mountedRef = useRef(true);
  const promiseRef = useRef<Promise<T> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = useCallback((promise: Promise<T>) => {
    // Cancel previous promise if exists
    promiseRef.current = promise;

    setState({
      data: undefined,
      error: undefined,
      loading: true,
    });

    promise.then(
      data => {
        // Only update state if the component is still mounted and this is the latest promise
        if (mountedRef.current && promiseRef.current === promise) {
          setState({
            data,
            error: undefined,
            loading: false,
          });
        }
      },
      error => {
        // Only update state if the component is still mounted and this is the latest promise
        if (mountedRef.current && promiseRef.current === promise) {
          setState({
            data: undefined,
            error,
            loading: false,
          });
        }
      }
    );
  }, []);

  const reset = useCallback(() => {
    setState({
      data: undefined,
      error: undefined,
      loading: false,
    });
  }, []);

  // Execute the async function when deps change
  useEffect(() => {
    if (asyncFunction) {
      run(asyncFunction());
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    run,
    reset,
  };
}
