import { act, renderHook } from '@testing-library/react';
import { useFullscreen } from '../../../hooks/browser-apis/useFullscreen/react';

// Mock the fullscreen API
const mockRequestFullscreen = jest.fn();
const mockExitFullscreen = jest.fn();

Object.defineProperty(document, 'fullscreenEnabled', {
  value: true,
  writable: true,
});

Object.defineProperty(document, 'webkitFullscreenEnabled', {
  value: true,
  writable: true,
});

Object.defineProperty(document.documentElement, 'requestFullscreen', {
  value: mockRequestFullscreen,
  writable: true,
});

Object.defineProperty(document, 'exitFullscreen', {
  value: mockExitFullscreen,
  writable: true,
});

Object.defineProperty(document, 'webkitExitFullscreen', {
  value: mockExitFullscreen,
  writable: true,
});

Object.defineProperty(document, 'mozCancelFullScreen', {
  value: mockExitFullscreen,
  writable: true,
});

Object.defineProperty(document, 'msExitFullscreen', {
  value: mockExitFullscreen,
  writable: true,
});

// Mock fullscreenElement
let fullscreenElementValue: Element | null = null;

Object.defineProperty(document, 'fullscreenElement', {
  get: () => fullscreenElementValue,
  configurable: true,
});

beforeEach(() => {
  jest.clearAllMocks();
  // Reset the fullscreen element value
  fullscreenElementValue = null;
  Object.defineProperty(document, 'fullscreenElement', {
    get: () => fullscreenElementValue,
    configurable: true,
  });
});

describe('useFullscreen (React)', () => {
  it('should have the correct properties', () => {
    const { result } = renderHook(() => useFullscreen());

    expect(typeof result.current.toggleFullscreen).toBe('function');
    expect(typeof result.current.isFullscreen).toBe('boolean');
    expect(typeof result.current.isEnabled).toBe('boolean');
  });

  it('should call requestFullscreen when toggling on', async () => {
    const { result } = renderHook(() => useFullscreen());

    await act(async () => {
      await result.current.toggleFullscreen();
    });

    expect(mockRequestFullscreen).toHaveBeenCalled();
  });

  it('should call exitFullscreen when toggling off', async () => {
    const { result } = renderHook(() => useFullscreen());

    // First, enter fullscreen mode to set the state
    await act(async () => {
      await result.current.enterFullscreen();
    });

    // Now manually set the fullscreen element to simulate being in fullscreen
    fullscreenElementValue = document.createElement('div');
    Object.defineProperty(document, 'fullscreenElement', {
      get: () => fullscreenElementValue,
      configurable: true,
    });

    // Dispatch the event(s) the hook listens to (fullscreenchange or webkitfullscreenchange)
    await act(async () => {
      document.dispatchEvent(new Event('fullscreenchange'));
      document.dispatchEvent(new Event('webkitfullscreenchange'));
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Now toggle, which should call exitFullscreen since we're in fullscreen
    await act(async () => {
      await result.current.toggleFullscreen();
    });

    expect(mockExitFullscreen).toHaveBeenCalled();
  });
});
