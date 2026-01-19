import { useRef, useState, useCallback } from 'react';

export function useFocus() {
  const ref = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const focus = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const onFocus = useCallback(() => setIsFocused(true), []);
  const onBlur = useCallback(() => setIsFocused(false), []);

  return { ref, isFocused, focus, bind: { onFocus, onBlur } };
}
