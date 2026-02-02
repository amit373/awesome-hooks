import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '../../../hooks/data-async/useDebounce/react';

jest.useFakeTimers();

const flushPromises = () => new Promise(setImmediate);

describe('useDebounce', () => {
  let callbackSpy: jest.Mock;
  let debouncedFunction: any;

  beforeEach(() => {
    callbackSpy = jest.fn();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should debounce the callback function', () => {
    const { result } = renderHook(() => useDebounce(callbackSpy, 300));
    debouncedFunction = result.current;

    // Call the debounced function multiple times
    debouncedFunction('arg1');
    debouncedFunction('arg2');
    debouncedFunction('arg3');

    // Callback should not have been called yet
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    // Fast-forward time to trigger the callback
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Callback should now have been called with the last arguments
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith('arg3');
  });

  it('should use default delay of 300ms when not provided', () => {
    const { result } = renderHook(() => useDebounce(callbackSpy));
    debouncedFunction = result.current;

    debouncedFunction('test');
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous timeouts when called again', () => {
    const { result } = renderHook(() => useDebounce(callbackSpy, 500));
    debouncedFunction = result.current;

    debouncedFunction('first');
    act(() => {
      jest.advanceTimersByTime(250); // Halfway through delay
    });
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    debouncedFunction('second'); // This should cancel the first call
    act(() => {
      jest.advanceTimersByTime(250); // Still shouldn't trigger because 'second' call resets timer
    });
    expect(callbackSpy).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(500); // Should trigger with 'second' after full delay
    });
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith('second');
  });

  it('should properly clean up timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useDebounce(callbackSpy, 500));
    debouncedFunction = result.current;

    debouncedFunction('test');

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // After unmounting, the callback should not be called
    expect(callbackSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle multiple arguments correctly', () => {
    const { result } = renderHook(() => useDebounce(callbackSpy, 100));
    debouncedFunction = result.current;

    debouncedFunction('arg1', 'arg2', 'arg3');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });
});
