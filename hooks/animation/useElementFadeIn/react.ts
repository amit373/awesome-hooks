import { useRef, useEffect, useState, RefObject } from 'react';

export function useElementFadeIn(duration: number = 500, delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const style = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out`,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  return { ref, style, isVisible };
}
