import { act, renderHook } from '@testing-library/react';
import { useMutationObserver } from '../../../hooks/dom-events/useMutationObserver/react';

describe('useMutationObserver', () => {
  let mockObserver: any;
  let mockObserve: jest.Mock;
  let mockDisconnect: jest.Mock;
  let mockTakeRecords: jest.Mock;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockDisconnect = jest.fn();
    mockTakeRecords = jest.fn().mockReturnValue([]);

    // Mock MutationObserver
    mockObserver = {
      observe: mockObserve,
      disconnect: mockDisconnect,
      takeRecords: mockTakeRecords,
    };

    (window as any).MutationObserver = jest.fn(() => mockObserver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useMutationObserver(callback));

    expect(result.current.isSupported).toBe(true);
  });

  it('should call the callback when mutations occur', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useMutationObserver(callback));

    const target = document.createElement('div');

    act(() => {
      result.current.observe(target);
    });

    // Simulate a mutation by manually triggering the observer callback
    const mockMutations = [{ type: 'childList', target }];

    // Get the actual observer instance from the mock
    const observerInstance = mockObserver;

    // Get the callback that was passed to the MutationObserver constructor
    const observerCallback = (window.MutationObserver as jest.Mock).mock
      .calls[0][0];

    observerCallback(mockMutations, observerInstance);

    expect(callback).toHaveBeenCalledWith(mockMutations, observerInstance);
  });

  it('should observe mutations with default options', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useMutationObserver(callback));

    const target = document.createElement('div');

    act(() => {
      result.current.observe(target);
    });

    expect(mockObserve).toHaveBeenCalledWith(target, {
      childList: true,
      subtree: true,
    });
  });

  it('should observe mutations with custom options', () => {
    const callback = jest.fn();
    const customOptions = { attributes: true, attributeFilter: ['class'] };
    const { result } = renderHook(() =>
      useMutationObserver(callback, customOptions)
    );

    const target = document.createElement('div');

    act(() => {
      result.current.observe(target, { childList: true });
    });

    expect(mockObserve).toHaveBeenCalledWith(target, { childList: true });
  });

  it('should disconnect observer', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useMutationObserver(callback));

    const target = document.createElement('div');
    act(() => {
      result.current.observe(target);
      result.current.disconnect();
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should take records', () => {
    const callback = jest.fn();
    const mockRecords = [
      { type: 'childList', target: document.createElement('div') },
    ];
    mockTakeRecords.mockReturnValue(mockRecords);

    const { result } = renderHook(() => useMutationObserver(callback));

    const records = result.current.takeRecords();

    expect(records).toEqual(mockRecords);
    expect(mockTakeRecords).toHaveBeenCalled();
  });

  it('should clean up on unmount', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useMutationObserver(callback));

    const target = document.createElement('div');
    act(() => {
      result.current.observe(target);
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
