import { useState, ChangeEvent } from 'react';

export function useSelect(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
    bind: {
      value,
      onChange
    }
  };
}
