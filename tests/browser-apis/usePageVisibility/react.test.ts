import { renderHook } from '@testing-library/react';
import { usePageVisibility } from '../../../hooks/browser-apis/usePageVisibility/react';

describe('usePageVisibility (React)', () => {
  it('should return a boolean value', () => {
    const { result } = renderHook(() => usePageVisibility());

    expect(typeof result.current).toBe('boolean');
  });

  it('should initially return true when document is visible', () => {
    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(true);
  });

  it('should add and remove event listeners', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => usePageVisibility());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'visibilitychange',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'visibilitychange',
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
