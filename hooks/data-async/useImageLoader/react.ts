import { useState, useEffect } from 'react';

export function useImageLoader(src: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    const onLoad = () => setLoaded(true);
    const onError = (e: ErrorEvent) => setError(new Error(`Failed to load image: ${src}`));

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src]);

  return { loaded, error };
}
