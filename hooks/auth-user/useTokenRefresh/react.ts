import { useEffect } from 'react';
import { useAuth } from '../useAuth/react';

export function useTokenRefresh(refreshFn: () => Promise<string>, intervalMs: number = 15 * 60 * 1000) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        await refreshFn();
      } catch (error) {
        console.error('Failed to refresh token', error);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshFn, intervalMs]);
}
