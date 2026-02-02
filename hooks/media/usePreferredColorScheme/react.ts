import { useState, useEffect } from 'react';

export type PreferredColorScheme = 'light' | 'dark' | null;

/**
 * Read the user's preferred color scheme (prefers-color-scheme media query)
 * @returns 'light' | 'dark' | null (null if no preference or SSR)
 */
export function usePreferredColorScheme(): PreferredColorScheme {
  const [scheme, setScheme] = useState<PreferredColorScheme>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => {
      setScheme(media.matches ? 'dark' : 'light');
    };

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return scheme;
}
