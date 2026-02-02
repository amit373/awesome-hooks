import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
}

interface UseToastReturn {
  toasts: Toast[];
  addToast: (message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

/**
 * React hook for managing toast notifications
 * @param defaultPosition - Default position for toasts
 * @returns Toast management functions
 */
export function useToast(
  defaultPosition: ToastPosition = 'top-right'
): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = Math.random().toString(36).substring(2, 9);
      const {
        type = 'info',
        position = defaultPosition,
        duration = 3000,
      } = options;

      const newToast: Toast = {
        id,
        message,
        type,
        position,
      };

      setToasts(prev => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [defaultPosition]
  );

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };
}
