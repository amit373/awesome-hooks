import { useState, useCallback } from 'react';

export function useAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>('info');

  const showAlert = useCallback((msg: string, t: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setMessage(msg);
    setType(t);
    setIsVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsVisible(false);
  }, []);

  return { isVisible, message, type, showAlert, hideAlert };
}
