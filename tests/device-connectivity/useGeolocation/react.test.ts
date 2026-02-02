import { act, renderHook } from '@testing-library/react';
import { useGeolocation } from '../../../hooks/device-connectivity/useGeolocation/react';

// Mock the geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};

Object.defineProperty(navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.position).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isSupported).toBe(true);
  });

  it('should handle unsupported geolocation', () => {
    // Temporarily remove geolocation to simulate unsupported case
    Object.defineProperty(navigator, 'geolocation', {
      value: null,
      writable: true,
    });

    const { result } = renderHook(() => useGeolocation());

    expect(result.current.isSupported).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe('Geolocation is not supported');

    // Restore geolocation for other tests
    Object.defineProperty(navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    });
  });

  it('should call getCurrentPosition', () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentPosition();
    });

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('should call watchPosition', () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.watchPosition();
    });

    expect(mockGeolocation.watchPosition).toHaveBeenCalled();
  });

  it('should call clearWatch', () => {
    const watchId = 123;
    mockGeolocation.watchPosition.mockReturnValue(watchId);

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.watchPosition();
    });

    act(() => {
      result.current.clearWatch();
    });

    expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(watchId);
  });
});
