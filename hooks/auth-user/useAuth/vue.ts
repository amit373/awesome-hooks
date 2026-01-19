import { ref, computed, readonly } from 'vue';

const user = ref<any>(null);

export function useAuth() {
  const login = (userData: any) => {
    user.value = userData;
  };

  const logout = () => {
    user.value = null;
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user: readonly(user),
    login,
    logout,
    isAuthenticated
  };
}
