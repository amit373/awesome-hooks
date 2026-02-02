import { useState, useEffect } from 'react';

/**
 * React hook for using CSS media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // For older browsers that don't support addEventListener
    if ('addEventListener' in mediaQueryList) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      (mediaQueryList as any).addListener(handleChange);
    }

    setMatches(mediaQueryList.matches);

    return () => {
      if ('removeEventListener' in mediaQueryList) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        (mediaQueryList as any).removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}
