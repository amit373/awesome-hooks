import { act, renderHook } from '@testing-library/react';
import { useSessionStorage } from '../../../hooks/storage/useSessionStorage/react';

describe('useSessionStorage', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it('should initialize with default value', () => {
    const { result } = renderHook(() =>
      useSessionStorage('test-key', 'default')
    );

    expect(result.current.value).toBe('default');
  });

  it('should set value in sessionStorage', () => {
    const { result } = renderHook(() =>
      useSessionStorage('test-key', 'default')
    );

    act(() => {
      result.current.set('new-value');
    });

    expect(result.current.value).toBe('new-value');
  });

  it('should remove value from sessionStorage', () => {
    const { result } = renderHook(() =>
      useSessionStorage('test-key', 'default')
    );

    act(() => {
      result.current.remove();
    });

    expect(result.current.value).toBeNull();
  });

  it('should update value using updater function', () => {
    const { result } = renderHook(() =>
      useSessionStorage('test-key', 'old-value')
    );

    act(() => {
      result.current.update(prev => prev + '-updated');
    });

    expect(result.current.value).toBe('old-value-updated');
  });
});
