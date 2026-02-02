import { useState, useEffect, useCallback } from 'react';

interface NetworkState {
  online: boolean;
  since?: Date;
  type?: string;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
}

interface UseNetworkReturn {
  online: boolean;
  since?: Date;
  type?: string;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
}

/**
 * React hook for monitoring network connectivity and characteristics
 * @returns Network state information
 */
export function useNetwork(): UseNetworkReturn {
  const [networkState, setNetworkState] = useState<NetworkState>(() => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    return { online, since: new Date() };
  });

  const updateNetworkState = useCallback(() => {
    setNetworkState(prev => {
      const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
      const newSince = online !== prev.online ? new Date() : prev.since;

      // Try to get connection info if available
      let connectionInfo = {};
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        connectionInfo = {
          type: connection.type,
          downlink: connection.downlink,
          downlinkMax: connection.downlinkMax,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt,
          saveData: connection.saveData,
        };
      }

      return {
        online,
        since: newSince,
        ...connectionInfo,
      };
    });
  }, []);

  useEffect(() => {
    updateNetworkState();

    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    // Add connection change listener if available
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.addEventListener) {
        connection.addEventListener('change', updateNetworkState);
      }
    }

    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);

      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.removeEventListener) {
          connection.removeEventListener('change', updateNetworkState);
        }
      }
    };
  }, [updateNetworkState]);

  return networkState;
}
