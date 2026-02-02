import { act, renderHook, waitFor } from '@testing-library/react';
import { useMousePosition } from '../../../hooks/device-connectivity/useMousePosition/react';

describe('useMousePosition', () => {
  beforeEach(() => {
    // Mock window.addEventListener and window.removeEventListener
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with default position', () => {
    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should update position on mousemove event', async () => {
    const { result } = renderHook(() => useMousePosition());

    // Simulate mousemove event inside act so state updates are flushed
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200,
    });

    act(() => {
      window.dispatchEvent(mouseEvent);
    });

    await waitFor(() => {
      expect(result.current).toEqual({ x: 100, y: 200 });
    });
  });

  it('should add and remove event listeners', () => {
    const { unmount } = renderHook(() => useMousePosition());

    expect(window.addEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
  });
});
