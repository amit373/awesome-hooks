import { renderHook } from '@testing-library/react';
import { useClickOutside } from '../../../hooks/dom-events/useClickOutside/react';

describe('useClickOutside', () => {
  it('should return a ref object', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useClickOutside(mockCallback));

    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('current');
    expect(typeof result.current).toBe('object');
  });

  it('should register and unregister mouse event listeners', () => {
    const mockCallback = jest.fn();
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useClickOutside(mockCallback));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
