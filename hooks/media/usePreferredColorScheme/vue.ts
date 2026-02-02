import { onMounted, onUnmounted, ref, Ref } from 'vue';

export type PreferredColorScheme = 'light' | 'dark' | null;

/**
 * Read the user's preferred color scheme (prefers-color-scheme media query)
 * @returns Ref containing 'light' | 'dark' | null
 */
export function usePreferredColorScheme(): Ref<PreferredColorScheme> {
  const scheme = ref<PreferredColorScheme>(null);

  onMounted(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => {
      scheme.value = media.matches ? 'dark' : 'light';
    };
    update();
    media.addEventListener('change', update);
    onUnmounted(() => {
      media.removeEventListener('change', update);
    });
  });

  return scheme;
}
