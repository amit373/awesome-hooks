import { useEffect, useState, useRef } from 'react';

export function useInfiniteScroll(callback: () => void) {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFetching) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setIsFetching(true);
        callback();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    // Assume parent resets fetching state or we rely on prop
    // Simple implementation resets it after a delay or expects external control
    // For this hook, let's expose a way to stop fetching
  }, [isFetching]);

  return [loadMoreRef, isFetching, setIsFetching] as const;
}
