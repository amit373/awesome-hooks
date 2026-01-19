import { reactive, onMounted } from 'vue';

export function useQueryParams() {
  const query = reactive<Record<string, string>>({});

  onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      query[key] = value;
    });
  });

  return query;
}
