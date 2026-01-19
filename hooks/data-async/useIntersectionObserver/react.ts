import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement>, IntersectionObserverEntry | null] {
  const ref = useRef<HTMLDivElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return [ref, entry];
}
