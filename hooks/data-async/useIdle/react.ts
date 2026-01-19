import { useState, useEffect } from 'react';
import { useThrottle } from '../../state-ui/useThrottle/react';

export function useIdle(ms: number = 3000) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), ms);
    };

    // Events to track
    const events = ['mousemove', 'keydown', 'wheel', 'touchstart'];
    
    // Throttle the event handler usually, but here just resetting timer is cheap enough
    // or use a throttled version if needed for performance on mousemove
    
    events.forEach(event => window.addEventListener(event, handleActivity));
    
    // Start initial timer
    timeoutId = setTimeout(() => setIsIdle(true), ms);

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      clearTimeout(timeoutId);
    };
  }, [ms]);

  return isIdle;
}
