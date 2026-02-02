import { act, renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../../../hooks/dom-events/useIntersectionObserver/react';

// Create a test component to use the hook
const TestComponent = ({
  callback,
  options,
}: {
  callback: (entry: any) => void;
  options?: any;
}) => {
  const { isIntersecting, entry, observe, unobserve } =
    useIntersectionObserver(options);

  return { isIntersecting, entry, observe, unobserve };
};

describe('useIntersectionObserver', () => {
  let mockObserver: any;
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    // Mock IntersectionObserver
    mockObserver = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      root: null,
      rootMargin: '0%',
      thresholds: [0],
    };

    (window as any).IntersectionObserver = jest.fn(() => mockObserver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBeUndefined();
  });

  it('should call observe function to observe an element', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useIntersectionObserver());

    act(() => {
      result.current.observe(element);
    });

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: [0],
        root: null,
        rootMargin: '0%',
      }
    );
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should call unobserve function to stop observing', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useIntersectionObserver());

    // First observe an element
    act(() => {
      result.current.observe(element);
    });

    // Then unobserve
    act(() => {
      result.current.unobserve();
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should update isIntersecting when intersection occurs', () => {
    const element = document.createElement('div');
    const mockEntry = {
      isIntersecting: true,
      target: element,
      boundingClientRect: {} as DOMRect,
      intersectionRatio: 0.5,
      intersectionRect: {} as DOMRect,
      rootBounds: {} as DOMRect,
      time: Date.now(),
    };

    // Mock the callback to trigger the state update
    const mockCallback = jest.fn().mockImplementation(([entry]) => {
      const callback = (window.IntersectionObserver as jest.Mock).mock
        .calls[0][0];
      callback([mockEntry]);
    });

    const { result } = renderHook(() => useIntersectionObserver());

    // First observe an element to set up the observer
    act(() => {
      result.current.observe(element);
    });

    // Manually trigger the callback to simulate intersection
    const callback = (window.IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    act(() => {
      callback([mockEntry]);
    });

    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.entry).toEqual(mockEntry);
  });

  it('should handle custom options', () => {
    const element = document.createElement('div');
    const options = {
      threshold: 0.5,
      root: null,
      rootMargin: '10px',
    };

    const { result } = renderHook(() => useIntersectionObserver(options));

    act(() => {
      result.current.observe(element);
    });

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: [0.5],
        root: null,
        rootMargin: '10px',
      }
    );
  });

  it('should clean up on unmount', () => {
    const element = document.createElement('div');
    const { result, unmount } = renderHook(() => useIntersectionObserver());

    act(() => {
      result.current.observe(element);
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
