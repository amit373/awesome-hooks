import { act, renderHook } from '@testing-library/react';
import { useOnline } from '../../../hooks/device-connectivity/useOnline/react';

describe('useOnline', () => {
  beforeEach(() => {
    // Reset navigator.onLine to true
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  it('should initialize as online', () => {
    const { result } = renderHook(() => useOnline());

    expect(result.current).toBe(true);
  });

  it('should update to offline when connection is lost', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const { result } = renderHook(() => useOnline());

    expect(result.current).toBe(true);

    // Simulate going offline by changing navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    // Trigger the offline event
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current).toBe(false);
  });

  it('should update to online when connection is restored', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const { result } = renderHook(() => useOnline());

    expect(result.current).toBe(false);

    // Simulate going online by changing navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    // Trigger the online event
    act(() => {
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current).toBe(true);
  });
});
