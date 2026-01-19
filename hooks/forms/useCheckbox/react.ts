import { useState, ChangeEvent } from 'react';

export function useCheckbox(initialValue: boolean = false) {
  const [checked, setChecked] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return {
    checked,
    onChange,
    bind: {
      checked,
      onChange
    }
  };
}
