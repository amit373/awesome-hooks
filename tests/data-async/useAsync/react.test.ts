import { act, renderHook } from '@testing-library/react';
import { useAsync } from '../../../hooks/data-async/useAsync/react';

describe('useAsync', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with loading false and no data', () => {
    const { result } = renderHook(() => useAsync());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should handle successful async operation', async () => {
    const testData = { id: 1, name: 'Test' };
    const asyncFn = () => Promise.resolve(testData);

    const { result } = renderHook(() => useAsync(asyncFn, []));

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(testData);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle failed async operation', async () => {
    const errorMessage = 'Something went wrong';
    const asyncFn = () => Promise.reject(new Error(errorMessage));

    const { result } = renderHook(() => useAsync(asyncFn, []));

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    // Wait for the promise to reject
    await act(async () => {
      try {
        await Promise.resolve();
      } catch (e) {
        // Expected
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it('should handle manual run of async operation', async () => {
    const testData = { id: 2, name: 'Manual Test' };
    const promise = Promise.resolve(testData);

    const { result } = renderHook(() => useAsync());

    // Initially not loading
    expect(result.current.loading).toBe(false);

    // Manually run the async operation
    act(() => {
      result.current.run(promise);
    });

    // Now loading
    expect(result.current.loading).toBe(true);

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(testData);
    expect(result.current.error).toBeUndefined();
  });

  it('should reset state', async () => {
    const testData = { id: 3, name: 'Reset Test' };
    const asyncFn = () => Promise.resolve(testData);

    const { result } = renderHook(() => useAsync(asyncFn, []));

    // Wait for the promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    // State should be populated
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(testData);
    expect(result.current.error).toBeUndefined();

    // Reset the state
    act(() => {
      result.current.reset();
    });

    // State should be reset
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should cancel previous promise when running new one', async () => {
    const slowPromise = new Promise(resolve =>
      setTimeout(() => resolve('slow'), 100)
    );
    const fastPromise = Promise.resolve('fast');

    const { result } = renderHook(() => useAsync());

    // Run the slow promise first
    act(() => {
      result.current.run(slowPromise as Promise<any>);
    });

    expect(result.current.loading).toBe(true);

    // Run the fast promise while slow is still pending
    act(() => {
      result.current.run(fastPromise);
    });

    // Wait for the fast promise to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('fast');
  });
});
