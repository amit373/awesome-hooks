import { signal, effect } from '@angular/core';

/**
 * Angular function for monitoring online/offline status
 * @returns Boolean indicating if the browser is online
 */
export function useOnline(): boolean {
  const isOnlineSignal = signal<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const handleOnline = () => {
    isOnlineSignal.set(true);
  };

  const handleOffline = () => {
    isOnlineSignal.set(false);
  };

  // Set up event listeners
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Clean up by removing event listeners
  // This would typically be called when the component is destroyed
  const cleanup = () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };

  return isOnlineSignal();
}
