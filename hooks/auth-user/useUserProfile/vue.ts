import { computed } from 'vue';
import { useAuth } from '../useAuth/vue';

export function useUserProfile() {
  const { user } = useAuth();
  return computed(() => user.value);
}
