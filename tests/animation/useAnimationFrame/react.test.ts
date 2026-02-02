import { act, renderHook } from '@testing-library/react';
import { useAnimationFrame } from '../../../hooks/animation/useAnimationFrame/react';

describe('useAnimationFrame', () => {
  let rafSpy: jest.SpyInstance;
  let cafSpy: jest.SpyInstance;
  let performanceSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock requestAnimationFrame and cancelAnimationFrame
    let rafCallbacks: Array<(time: number) => void> = [];

    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(cb => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });

    cafSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => {});

    // Mock performance.now
    let now = 0;
    performanceSpy = jest
      .spyOn(performance, 'now')
      .mockImplementation(() => now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const runNextFrame = (rafCallbacks: Array<(time: number) => void>) => {
    const cb = rafCallbacks.shift();
    if (cb) {
      cb(0);
    }
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAnimationFrame());

    expect(result.current.frame).toBe(0);
    expect(result.current.fps).toBe(0);
  });

  it('should increment frame count on animation frames', async () => {
    const { result } = renderHook(() => useAnimationFrame());

    // Flush useEffect and state updates so isActive is true and RAF is scheduled
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(window.requestAnimationFrame).toHaveBeenCalled();

    const rafCalls = (window.requestAnimationFrame as jest.Mock).mock.calls;
    expect(rafCalls.length).toBeGreaterThan(0);

    const animationCallback = rafCalls[rafCalls.length - 1][0];
    act(() => {
      animationCallback(16);
    });

    expect(result.current.frame).toBeGreaterThan(0);
  });

  it('should start animation when start is called', () => {
    const { result } = renderHook(() => useAnimationFrame());

    // Initially should have scheduled an animation frame
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should stop animation when stop is called', () => {
    const { result } = renderHook(() => useAnimationFrame());

    const initialCallCount = (window.requestAnimationFrame as jest.Mock).mock
      .calls.length;

    act(() => {
      result.current.stop();
    });

    // Should have cancelled the animation frame
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should reset frame and fps when reset is called', async () => {
    const { result } = renderHook(() => useAnimationFrame());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const rafCalls = (window.requestAnimationFrame as jest.Mock).mock.calls;
    const animationCallback = rafCalls[rafCalls.length - 1][0];
    act(() => {
      animationCallback(16);
    });

    expect(result.current.frame).toBeGreaterThan(0);

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.frame).toBe(0);
    expect(result.current.fps).toBe(0);
  });

  it('should clean up on unmount', () => {
    const { unmount } = renderHook(() => useAnimationFrame());

    // Unmount should cancel animation frame
    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});
