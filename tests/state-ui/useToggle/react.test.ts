import { act, renderHook } from '@testing-library/react';
import { useToggle } from '../../../hooks/state-ui/useToggle/react';

describe('useToggle', () => {
  it('should initialize with the correct default value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize with a custom default value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle the value', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](); // Call toggle
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](); // Call toggle again
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set a specific value', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[2](true); // Call setValue with true
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false); // Call setValue with false
    });

    expect(result.current[0]).toBe(false);
  });
});
