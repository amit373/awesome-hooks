import { act, renderHook } from '@testing-library/react';
import { useThrottle } from '../../../hooks/data-async/useThrottle/react';

jest.useFakeTimers();

const flushPromises = () => new Promise(setImmediate);

describe('useThrottle', () => {
  let callbackSpy: jest.Mock;
  let throttledFunction: any;

  beforeEach(() => {
    callbackSpy = jest.fn();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should throttle the callback function', () => {
    const { result } = renderHook(() => useThrottle(callbackSpy, 300));
    throttledFunction = result.current;

    // Call the throttled function multiple times
    throttledFunction('arg1');
    throttledFunction('arg2');
    throttledFunction('arg3');

    // Callback should have been called once with the first arguments
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith('arg1');

    // Fast-forward time to allow another call
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Now the last call should have been executed
    expect(callbackSpy).toHaveBeenCalledTimes(2);
    expect(callbackSpy).toHaveBeenLastCalledWith('arg3');
  });

  it('should use default delay of 300ms when not provided', () => {
    const { result } = renderHook(() => useThrottle(callbackSpy));
    throttledFunction = result.current;

    throttledFunction('test');
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith('test');

    // Try to call again immediately
    throttledFunction('second');
    expect(callbackSpy).toHaveBeenCalledTimes(1); // Should still be 1 due to throttling

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(2);
    expect(callbackSpy).toHaveBeenLastCalledWith('second');
  });

  it('should respect the throttle interval', () => {
    const { result } = renderHook(() => useThrottle(callbackSpy, 500));
    throttledFunction = result.current;

    throttledFunction('first');
    expect(callbackSpy).toHaveBeenCalledTimes(1);

    // Call multiple times within the interval
    throttledFunction('second');
    throttledFunction('third');
    throttledFunction('fourth');

    expect(callbackSpy).toHaveBeenCalledTimes(1); // Still only 1 call

    // Advance time to just before the interval ends
    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(1); // Still only 1 call

    // Advance time to complete the interval
    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(callbackSpy).toHaveBeenCalledTimes(2); // Now should be 2 calls
    expect(callbackSpy).toHaveBeenLastCalledWith('fourth');
  });

  it('should properly clean up timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useThrottle(callbackSpy, 500));
    throttledFunction = result.current;

    throttledFunction('test');

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // After unmounting, the callback should not be called more than once
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple arguments correctly', () => {
    const { result } = renderHook(() => useThrottle(callbackSpy, 100));
    throttledFunction = result.current;

    throttledFunction('arg1', 'arg2', 'arg3');

    expect(callbackSpy).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('should allow immediate execution after interval passes', () => {
    const { result } = renderHook(() => useThrottle(callbackSpy, 200));
    throttledFunction = result.current;

    throttledFunction('first');
    expect(callbackSpy).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    throttledFunction('second');
    expect(callbackSpy).toHaveBeenCalledTimes(2); // Should allow immediate execution
    expect(callbackSpy).toHaveBeenLastCalledWith('second');
  });
});
