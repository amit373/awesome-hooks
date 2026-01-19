import { useState, useEffect, useRef } from 'react';

interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export function useResizeObserver() {
  const ref = useRef<HTMLElement>(null);
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setSize(entries[0].contentRect);
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
