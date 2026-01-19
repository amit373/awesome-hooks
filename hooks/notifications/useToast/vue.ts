import { ref } from 'vue';

export interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    toasts.value.push({ id, message, type });

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  };

  return { toasts, addToast, removeToast };
}
