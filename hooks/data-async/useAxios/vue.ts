import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

export function useAxios<T>(url: MaybeRefOrGetter<string>, config: AxiosRequestConfig = {}) {
  const data = ref<T | null>(null);
  const error = ref<AxiosError | null>(null);
  const loading = ref(true);

  watchEffect(async (onCleanup) => {
    const source = axios.CancelToken.source();
    onCleanup(() => source.cancel());

    loading.value = true;
    error.value = null;
    
    try {
      const response = await axios(toValue(url), { ...config, cancelToken: source.token });
      data.value = response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        error.value = err as AxiosError;
      }
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
