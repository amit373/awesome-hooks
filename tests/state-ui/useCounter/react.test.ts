import { act, renderHook } from '@testing-library/react';
import { useCounter } from '../../../hooks/state-ui/useCounter/react';

describe('useCounter', () => {
  it('should initialize with the correct default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current[0]).toBe(0);
  });

  it('should initialize with a custom default value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current[0]).toBe(5);
  });

  it('should increment the counter', () => {
    const { result } = renderHook(() => useCounter(0));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1].increment();
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1].increment();
    });

    expect(result.current[0]).toBe(2);
  });

  it('should decrement the counter', () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current[0]).toBe(5);

    act(() => {
      result.current[1].decrement();
    });

    expect(result.current[0]).toBe(4);

    act(() => {
      result.current[1].decrement();
    });

    expect(result.current[0]).toBe(3);
  });

  it('should reset the counter', () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current[0]).toBe(10);

    act(() => {
      result.current[1].increment();
      result.current[1].increment();
    });

    expect(result.current[0]).toBe(12);

    act(() => {
      result.current[1].reset();
    });

    expect(result.current[0]).toBe(10);
  });

  it('should set a specific value', () => {
    const { result } = renderHook(() => useCounter(0));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1].setValue(42);
    });

    expect(result.current[0]).toBe(42);
  });

  it('should work with custom step', () => {
    const { result } = renderHook(() => useCounter(0, 5));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1].increment();
    });

    expect(result.current[0]).toBe(5);

    act(() => {
      result.current[1].decrement();
    });

    expect(result.current[0]).toBe(0);
  });
});
