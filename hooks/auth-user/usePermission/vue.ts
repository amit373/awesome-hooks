import { computed } from 'vue';
import { useAuth } from '../useAuth/vue';

export function usePermission(requiredPermission: string) {
  const { user } = useAuth();

  return computed(() => {
    if (!user.value || !user.value.permissions) return false;
    return user.value.permissions.includes(requiredPermission);
  });
}
