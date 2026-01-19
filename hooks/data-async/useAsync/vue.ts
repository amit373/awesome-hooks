import { ref, onMounted } from 'vue';

export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle');
  const value = ref<T | null>(null);
  const error = ref<any | null>(null);

  const execute = () => {
    status.value = 'pending';
    value.value = null;
    error.value = null;
    return asyncFunction()
      .then((response) => {
        value.value = response;
        status.value = 'success';
      })
      .catch((err) => {
        error.value = err;
        status.value = 'error';
      });
  };

  onMounted(() => {
    if (immediate) {
      execute();
    }
  });

  return { execute, status, value, error };
}
