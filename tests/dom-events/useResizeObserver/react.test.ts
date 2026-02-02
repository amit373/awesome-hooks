import { act, renderHook } from '@testing-library/react';
import { useResizeObserver } from '../../../hooks/dom-events/useResizeObserver/react';

describe('useResizeObserver', () => {
  let mockObserver: any;
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    // Mock ResizeObserver
    mockObserver = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };

    (window as any).ResizeObserver = jest.fn(() => mockObserver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useResizeObserver());

    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
  });

  it('should call observe function to observe an element', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useResizeObserver());

    act(() => {
      result.current.observe(element);
    });

    expect(window.ResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(mockObserve).toHaveBeenCalledWith(element, { box: 'content-box' });
  });

  it('should call unobserve function to stop observing', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useResizeObserver());

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

  it('should update dimensions when resize occurs', () => {
    const element = document.createElement('div');
    const mockEntry = {
      target: element,
      contentRect: { width: 100, height: 200 },
      borderBoxSize: [{ inlineSize: 120, blockSize: 220 }],
      contentBoxSize: [{ inlineSize: 100, blockSize: 200 }],
    };

    const { result } = renderHook(() => useResizeObserver());

    // First observe an element to set up the observer
    act(() => {
      result.current.observe(element);
    });

    // Manually trigger the callback to simulate resize
    const callback = (window.ResizeObserver as jest.Mock).mock.calls[0][0];
    act(() => {
      callback([mockEntry]);
    });

    expect(result.current.width).toBe(100); // content-box width
    expect(result.current.height).toBe(200); // content-box height
    expect(result.current.entry).toEqual(mockEntry);
  });

  it('should handle border-box measurements', () => {
    const element = document.createElement('div');
    const mockEntry = {
      target: element,
      contentRect: { width: 100, height: 200 },
      borderBoxSize: [{ inlineSize: 120, blockSize: 220 }],
      contentBoxSize: [{ inlineSize: 100, blockSize: 200 }],
    };

    const { result } = renderHook(() =>
      useResizeObserver({ box: 'border-box' })
    );

    // First observe an element to set up the observer
    act(() => {
      result.current.observe(element);
    });

    // Manually trigger the callback to simulate resize
    const callback = (window.ResizeObserver as jest.Mock).mock.calls[0][0];
    act(() => {
      callback([mockEntry]);
    });

    expect(result.current.width).toBe(120); // border-box width
    expect(result.current.height).toBe(220); // border-box height
  });

  it('should clean up on unmount', () => {
    const element = document.createElement('div');
    const { result, unmount } = renderHook(() => useResizeObserver());

    act(() => {
      result.current.observe(element);
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
