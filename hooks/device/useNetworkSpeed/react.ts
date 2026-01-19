import { useState, useEffect } from 'react';

export function useNetworkSpeed() {
  const [downlink, setDownlink] = useState<number | null>(null);
  const [effectiveType, setEffectiveType] = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return;

    const updateConnection = () => {
      setDownlink(conn.downlink);
      setEffectiveType(conn.effectiveType);
    };

    updateConnection();
    conn.addEventListener('change', updateConnection);
    return () => conn.removeEventListener('change', updateConnection);
  }, []);

  return { downlink, effectiveType };
}
