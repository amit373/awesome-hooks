import { useState, useCallback } from 'react';

/**
 * Toggle hook for boolean state management
 * @param initialValue - Initial boolean value (default: false)
 * @returns [value, toggle, setValue] tuple
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle, setValue];
}
