import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';

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
 * An Angular service for handling asynchronous operations
 * @param asyncFunction The asynchronous function to execute
 * @param deps Dependencies that trigger a re-run of the async function
 * @returns Async state and control functions
 */
@Injectable({ providedIn: 'root' })
export class AsyncService<T> implements OnDestroy {
  private data = signal<T | undefined>(undefined);
  private error = signal<Error | undefined>(undefined);
  private loading = signal<boolean>(false);

  private subscription = new Subscription();
  private mounted = true;
  private promiseRef: Promise<T> | null = null;

  readonly data$ = this.data.asReadonly();
  readonly error$ = this.error.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  constructor() {}

  /**
   * Executes an asynchronous operation
   * @param promise The promise to execute
   */
  run(promise: Promise<T>): void {
    // Cancel previous promise if exists
    this.promiseRef = promise;

    this.data.set(undefined);
    this.error.set(undefined);
    this.loading.set(true);

    promise.then(
      result => {
        // Only update state if the component is still mounted and this is the latest promise
        if (this.mounted && this.promiseRef === promise) {
          this.data.set(result);
          this.error.set(undefined);
          this.loading.set(false);
        }
      },
      err => {
        // Only update state if the component is still mounted and this is the latest promise
        if (this.mounted && this.promiseRef === promise) {
          this.data.set(undefined);
          this.error.set(err instanceof Error ? err : new Error(String(err)));
          this.loading.set(false);
        }
      }
    );
  }

  /**
   * Resets the async state
   */
  reset(): void {
    this.data.set(undefined);
    this.error.set(undefined);
    this.loading.set(false);
  }

  ngOnDestroy(): void {
    this.mounted = false;
    this.subscription.unsubscribe();
  }
}

/**
 * Factory function to create an AsyncService instance
 * @param asyncFunction The asynchronous function to execute
 * @param deps Dependencies that trigger a re-run of the async function
 * @returns Async state and control functions
 */
export function useAsync<T>(
  asyncFunction?: () => Promise<T>,
  deps?: any[]
): UseAsyncReturn<T> {
  const service = new AsyncService<T>();

  // Execute the async function when deps change or immediately
  if (asyncFunction) {
    service.run(asyncFunction());
  }

  return {
    get data() {
      return service.data$();
    },
    get error() {
      return service.error$();
    },
    get loading() {
      return service.loading$();
    },
    run: (promise: Promise<T>) => service.run(promise),
    reset: () => service.reset(),
  };
}
