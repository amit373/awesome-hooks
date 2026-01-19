import { useState, useEffect } from 'react';

export function useTransition(
  isActive: boolean,
  duration: number = 300
): { shouldMount: boolean; stage: 'enter' | 'active' | 'exit' | 'unmounted' } {
  const [stage, setStage] = useState<'enter' | 'active' | 'exit' | 'unmounted'>(
    isActive ? 'active' : 'unmounted'
  );
  const [shouldMount, setShouldMount] = useState(isActive);

  useEffect(() => {
    let timeoutId: any;

    if (isActive) {
      setShouldMount(true);
      setStage('enter');
      // Force reflow/next frame to allow transition to start
      requestAnimationFrame(() => {
         requestAnimationFrame(() => {
             setStage('active');
         })
      });
    } else {
      setStage('exit');
      timeoutId = setTimeout(() => {
        setShouldMount(false);
        setStage('unmounted');
      }, duration);
    }

    return () => clearTimeout(timeoutId);
  }, [isActive, duration]);

  return { shouldMount, stage };
}
