import { shallowRef } from 'vue';

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
 * A Vue composable for managing toast notifications
 * @param defaultPosition - Default position for toasts
 * @returns Toast management functions
 */
export function useToast(
  defaultPosition: ToastPosition = 'top-right'
): UseToastReturn {
  const toasts = shallowRef<Toast[]>([]);

  const addToast = (message: string, options: ToastOptions = {}) => {
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

    toasts.value = [...toasts.value, newToast];

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  };

  const clearToasts = () => {
    toasts.value = [];
  };

  return {
    get toasts() {
      return toasts.value;
    },
    addToast,
    removeToast,
    clearToasts,
  };
}
