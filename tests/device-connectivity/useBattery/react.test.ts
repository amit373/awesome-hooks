import { act, renderHook, waitFor } from '@testing-library/react';
import { useBattery } from '../../../hooks/device-connectivity/useBattery/react';

describe('useBattery', () => {
  let originalGetBattery: any;

  beforeAll(() => {
    originalGetBattery = (navigator as any).getBattery;
  });

  afterAll(() => {
    Object.defineProperty(navigator, 'getBattery', {
      value: originalGetBattery,
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', async () => {
    const mockBattery = {
      level: 0.8,
      charging: true,
      chargingTime: 3600,
      dischargingTime: Infinity,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    const mockGetBattery = jest.fn().mockResolvedValue(mockBattery);

    Object.defineProperty(navigator, 'getBattery', {
      value: mockGetBattery,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useBattery());

    await waitFor(
      () => {
        expect(result.current.isSupported).toBe(true);
      },
      { timeout: 1000 }
    );

    expect(result.current.battery).toEqual({
      level: 0.8,
      charging: true,
      chargingTime: 3600,
      dischargingTime: Infinity,
    });
    expect(result.current.error).toBeNull();
  });

  it('should handle unsupported battery API', async () => {
    // Use a non-function so typeof nav.getBattery !== 'function'
    Object.defineProperty(navigator, 'getBattery', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useBattery());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isSupported).toBe(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.message).toBe(
      'Battery Status API not supported'
    );

    // Restore for subsequent tests
    Object.defineProperty(navigator, 'getBattery', {
      value: originalGetBattery,
      configurable: true,
      writable: true,
    });
  });

  it('should handle battery API error', async () => {
    const mockGetBatteryError = jest
      .fn()
      .mockRejectedValue(new Error('Battery API error'));

    Object.defineProperty(navigator, 'getBattery', {
      value: mockGetBatteryError,
      configurable: true,
      writable: true,
    });

    const { result } = renderHook(() => useBattery());

    await waitFor(
      () => {
        expect(result.current.isSupported).toBe(false);
        expect(result.current.error).not.toBeNull();
        expect(result.current.error?.message).toBe('Battery API error');
      },
      { timeout: 1000 }
    );
  });
});
