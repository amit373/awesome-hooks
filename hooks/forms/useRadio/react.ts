import { useState, ChangeEvent } from 'react';

export function useRadio(name: string, initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    name,
    value,
    onChange,
  };
}
