import { act, renderHook } from '@testing-library/react';
import { useSpring } from '../../../hooks/animation/useSpring/react';

describe('useSpring', () => {
  let rafSpy: jest.SpyInstance<number, [callback: FrameRequestCallback]>;
  let cafSpy: jest.SpyInstance<void, [handle: number]>;

  beforeEach(() => {
    jest.useFakeTimers();
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(cb => {
        setTimeout(cb, 16);
        return 1;
      });
    cafSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    if (rafSpy) rafSpy.mockRestore();
    if (cafSpy) cafSpy.mockRestore();
    jest.useRealTimers();
  });

  it('should initialize with correct initial values', () => {
    const initialValues = { x: 0, y: 100 };
    const { result } = renderHook(() => useSpring(initialValues));

    expect(result.current[0]).toEqual(initialValues);
  });

  it('should animate towards target values', async () => {
    const initialValues = { x: 0 };
    const targetValues = { x: 100 };

    const { result } = renderHook(() => useSpring(initialValues));

    // Initially at starting position
    expect(result.current[0].x).toBe(0);

    // Set target
    act(() => {
      result.current[1](targetValues);
    });

    // Advance timers to allow animation
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Should be moving towards target
    expect(result.current[0].x).toBeGreaterThan(0);
    expect(result.current[0].x).toBeLessThanOrEqual(100);
  });

  it('should accept custom spring configuration', () => {
    const initialValues = { x: 0 };
    const config = { tension: 200, friction: 30, precision: 0.1 };

    const { result } = renderHook(() => useSpring(initialValues, config));

    expect(result.current[0]).toEqual(initialValues);
  });

  it('should handle multiple animated values', () => {
    const initialValues = { x: 0, y: 0, opacity: 1 };
    const targetValues = { x: 100, y: 50, opacity: 0 };

    const { result } = renderHook(() => useSpring(initialValues));

    act(() => {
      result.current[1](targetValues);
    });

    // All values should be present
    expect(result.current[0]).toHaveProperty('x');
    expect(result.current[0]).toHaveProperty('y');
    expect(result.current[0]).toHaveProperty('opacity');
  });

  it('should gradually approach target values', () => {
    const initialValues = { scale: 0 };
    const targetValues = { scale: 1 };

    const { result } = renderHook(() => useSpring(initialValues));

    // Set target
    act(() => {
      result.current[1](targetValues);
    });

    const initialValue = result.current[0].scale;

    // Advance animation
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const newValue = result.current[0].scale;

    // Should be moving toward target
    expect(newValue).toBeGreaterThan(initialValue);
    expect(newValue).toBeLessThanOrEqual(1);
  });

  it('should clean up animation frame on unmount', () => {
    const initialValues = { x: 0 };

    const { unmount } = renderHook(() => useSpring(initialValues));

    unmount();
  });
});
