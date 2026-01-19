import { watchEffect } from 'vue';
import { useAuth } from '../useAuth/vue';

export function useTokenRefresh(refreshFn: () => Promise<string>, intervalMs: number = 900000) {
  const { isAuthenticated } = useAuth();

  watchEffect((onCleanup) => {
    if (!isAuthenticated.value) return;

    const timer = setInterval(async () => {
      try {
        await refreshFn();
      } catch (e) {
        console.error('Refresh failed', e);
      }
    }, intervalMs);

    onCleanup(() => clearInterval(timer));
  });
}
