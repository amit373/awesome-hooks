import { Injectable, signal } from '@angular/core';

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
 * An Angular service for managing toast notifications
 * @param defaultPosition - Default position for toasts
 * @returns Toast management functions
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);

  readonly toasts$ = this.toastsSignal.asReadonly();

  constructor(private defaultPosition: ToastPosition = 'top-right') {}

  /**
   * Add a new toast notification
   * @param message The message to display in the toast
   * @param options Additional options for the toast
   */
  addToast(message: string, options: ToastOptions = {}): void {
    const id = Math.random().toString(36).substring(2, 9);
    const {
      type = 'info',
      position = this.defaultPosition,
      duration = 3000,
    } = options;

    const newToast: Toast = {
      id,
      message,
      type,
      position,
    };

    this.toastsSignal.update(toasts => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
  }

  /**
   * Remove a specific toast by ID
   * @param id The ID of the toast to remove
   */
  removeToast(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  /**
   * Clear all toasts
   */
  clearToasts(): void {
    this.toastsSignal.set([]);
  }
}

/**
 * Factory function to create a ToastService instance
 * @param defaultPosition - Default position for toasts
 * @returns Toast management functions
 */
export function useToast(
  defaultPosition: ToastPosition = 'top-right'
): UseToastReturn {
  const service = new ToastService(defaultPosition);

  return {
    get toasts() {
      return service.toasts$();
    },
    addToast: (message: string, options?: ToastOptions) =>
      service.addToast(message, options),
    removeToast: (id: string) => service.removeToast(id),
    clearToasts: () => service.clearToasts(),
  };
}
