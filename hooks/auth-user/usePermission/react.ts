import { useAuth } from '../useAuth/react';

export function usePermission(requiredPermission: string) {
  const { user } = useAuth();
  
  if (!user || !user.permissions) return false;
  
  return user.permissions.includes(requiredPermission);
}
