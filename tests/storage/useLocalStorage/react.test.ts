import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../../../hooks/storage/useLocalStorage/react';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with the default value', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value')
    );

    expect(result.current.value).toBe('default-value');
  });

  it('should save value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current.setValue('new-value');
    });

    expect(result.current.value).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should retrieve value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current.value).toBe('stored-value');
  });

  it('should handle complex objects', () => {
    const defaultValue = { name: 'John', age: 30 };
    const newValue = { name: 'Jane', age: 25 };

    const { result } = renderHook(() =>
      useLocalStorage('obj-key', defaultValue)
    );

    act(() => {
      result.current.setValue(newValue);
    });

    expect(result.current.value).toEqual(newValue);
    const storedValue = localStorage.getItem('obj-key');
    expect(storedValue).not.toBeNull();
    expect(JSON.parse(storedValue!)).toEqual(newValue);
  });

  it('should remove item from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current.removeValue(); // Call remove function
    });

    expect(result.current.value).toBeNull();
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle number values', () => {
    const { result } = renderHook(() => useLocalStorage('num-key', 42));

    expect(result.current.value).toBe(42);

    act(() => {
      result.current.setValue(100);
    });

    expect(result.current.value).toBe(100);
    expect(localStorage.getItem('num-key')).toBe(JSON.stringify(100));
  });

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('bool-key', true));

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue(false);
    });

    expect(result.current.value).toBe(false);
    expect(localStorage.getItem('bool-key')).toBe(JSON.stringify(false));
  });

  it('should handle null and undefined values', () => {
    const { result } = renderHook(() => useLocalStorage('null-key', null));

    expect(result.current.value).toBe(null);

    act(() => {
      result.current.setValue(null);
    });

    expect(result.current.value).toBe(null);
    expect(localStorage.getItem('null-key')).toBeNull();
  });

  it('should sync with direct localStorage changes', () => {
    const { result } = renderHook(() => useLocalStorage('sync-key', 'initial'));

    expect(result.current.value).toBe('initial');

    // Simulate change from another tab/window by directly changing localStorage
    // and dispatching a storage event
    localStorage.setItem('sync-key', JSON.stringify('from-another-tab'));

    // Create and dispatch a storage event to simulate cross-tab sync
    const storageEvent = new Event('storage');
    Object.assign(storageEvent, {
      key: 'sync-key',
      oldValue: JSON.stringify('initial'),
      newValue: JSON.stringify('from-another-tab'),
      url: window.location.href,
      storageArea: localStorage,
    });

    act(() => {
      window.dispatchEvent(storageEvent);
    });

    // The hook should reflect the new value
    expect(result.current.value).toBe('from-another-tab');
  });
});
