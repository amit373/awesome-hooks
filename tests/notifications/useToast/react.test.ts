import { act, renderHook } from '@testing-library/react';
import { useToast } from '../../../hooks/notifications/useToast/react';

describe('useToast', () => {
  it('should initialize with empty toasts', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('info');
    expect(result.current.toasts[0].position).toBe('top-right');
  });

  it('should remove a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message');
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should clear all toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message 1');
      result.current.addToast('Test message 2');
    });

    expect(result.current.toasts).toHaveLength(2);

    act(() => {
      result.current.clearToasts();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should have correct toast properties', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.addToast('Test message', {
        type: 'success',
        position: 'top-right',
        duration: 3000,
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[0].position).toBe('top-right');
  });

  it('should use default position when none provided', () => {
    const { result } = renderHook(() => useToast('bottom-left'));

    act(() => {
      result.current.addToast('Test message');
    });

    expect(result.current.toasts[0].position).toBe('bottom-left');
  });
});
