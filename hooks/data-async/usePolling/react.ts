import { useState, useEffect, useRef } from 'react';

export function usePolling<T>(
  callback: () => Promise<T>,
  interval: number,
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const tick = async () => {
      try {
        const result = await savedCallback.current();
        setData(result);
      } catch (e) {
        console.error(e);
      }
    };

    tick(); // Initial call
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, enabled]);

  return data;
}
