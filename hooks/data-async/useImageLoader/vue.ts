import { ref, watchEffect } from 'vue';

export function useImageLoader(src: string) {
  const loaded = ref(false);
  const error = ref<Error | null>(null);

  watchEffect((onCleanup) => {
    const img = new Image();
    img.src = src;
    loaded.value = false;
    error.value = null;

    const onLoad = () => loaded.value = true;
    const onError = () => error.value = new Error(`Failed to load ${src}`);

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    onCleanup(() => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    });
  });

  return { loaded, error };
}
