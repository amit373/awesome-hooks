import { useEffect, useState } from 'react';
import { useLocalStorage } from '../useLocalStorage/react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
}

export function useDarkMode() {
  const [enabled, setEnabled] = useLocalStorage<boolean>('dark-mode', false);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  
  useEffect(() => {
    const element = window.document.body;
    const isDark = enabled === undefined ? prefersDark : enabled;
    if (isDark) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }, [enabled, prefersDark]);

  return [enabled, setEnabled] as const;
}
