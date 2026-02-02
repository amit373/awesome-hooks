import { DestroyRef, inject, signal, WritableSignal } from '@angular/core';

export type PreferredColorScheme = 'light' | 'dark' | null;

/**
 * Read the user's preferred color scheme (prefers-color-scheme media query)
 * @returns Signal containing 'light' | 'dark' | null
 */
export function usePreferredColorScheme(): WritableSignal<PreferredColorScheme> {
  const destroyRef = inject(DestroyRef);
  const scheme = signal<PreferredColorScheme>(null);
  const win = typeof window !== 'undefined' ? window : null;

  if (win) {
    const media = win.matchMedia('(prefers-color-scheme: dark)');
    const update = () => scheme.set(media.matches ? 'dark' : 'light');
    update();
    media.addEventListener('change', update);
    destroyRef.onDestroy(() => media.removeEventListener('change', update));
  }

  return scheme;
}
