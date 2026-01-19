import { useState, useCallback, useEffect } from 'react';

export function useSnackbar(autoHideDuration = 6000) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openSnackbar = useCallback((msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  }, []);

  const closeSnackbar = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoHideDuration]);

  return { isOpen, message, openSnackbar, closeSnackbar };
}
