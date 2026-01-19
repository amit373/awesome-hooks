import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false): [boolean, (nextValue?: any) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((nextValue?: any) => {
    if (typeof nextValue === 'boolean') {
      setValue(nextValue);
    } else {
      setValue(v => !v);
    }
  }, []);

  return [value, toggle];
}
