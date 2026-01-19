import { useState, ChangeEvent } from 'react';

export function useNumberInput(initialValue: number = 0) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setValue(isNaN(val) ? 0 : val);
  };

  const increment = () => setValue(v => v + 1);
  const decrement = () => setValue(v => v - 1);

  return {
    value,
    onChange,
    increment,
    decrement,
    bind: {
      value,
      onChange,
      type: 'number'
    }
  };
}
