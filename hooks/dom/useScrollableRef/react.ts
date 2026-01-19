import { useRef, useState, useEffect } from 'react';

export function useScrollableRef() {
  const ref = useRef<HTMLElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (ref.current) {
        setCanScroll(ref.current.scrollHeight > ref.current.clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return { ref, canScroll };
}
