import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue';

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  watchEffect(async (onCleanup) => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    onCleanup(() => controller.abort());

    const urlValue = toValue(url);
    loading.value = true;
    data.value = null;
    error.value = null;
    
    try {
      const res = await fetch(urlValue, { signal });
      if (!res.ok) throw new Error(res.statusText);
      data.value = await res.json();
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        error.value = err;
      }
    } finally {
      if (!signal.aborted) {
        loading.value = false;
      }
    }
  });

  return { data, error, loading };
}
