import { act, renderHook } from '@testing-library/react';
import { useNetwork } from '../../../hooks/device-connectivity/useNetwork/react';

describe('useNetwork', () => {
  beforeEach(() => {
    // Reset navigator.onLine to true
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  it('should initialize with the correct network status', () => {
    const { result } = renderHook(() => useNetwork());

    expect(result.current.online).toBe(true);
  });

  it('should update status when online', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    const { result } = renderHook(() => useNetwork());

    expect(result.current.online).toBe(true);
  });

  it('should update status when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    const { result } = renderHook(() => useNetwork());

    expect(result.current.online).toBe(false);
  });

  it('should have correct network type when available', () => {
    const mockConnection = {
      type: 'wifi',
      effectiveType: '4g',
      rtt: 50,
      downlink: 10,
      downlinkMax: 50,
      saveData: false,
    };

    Object.defineProperty(navigator, 'connection', {
      writable: true,
      value: mockConnection,
    });

    const { result } = renderHook(() => useNetwork());

    expect(result.current.type).toBe('wifi');
    expect(result.current.effectiveType).toBe('4g');
    expect(result.current.rtt).toBe(50);
    expect(result.current.downlink).toBe(10);
    expect(result.current.downlinkMax).toBe(50);
    expect(result.current.saveData).toBe(false);
  });

  it('should update when network changes', () => {
    const { result } = renderHook(() => useNetwork());

    expect(result.current.online).toBe(true);

    // Change online status
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    // Trigger the event
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.online).toBe(false);
  });
});
