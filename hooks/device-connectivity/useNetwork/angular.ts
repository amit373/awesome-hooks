import { signal } from '@angular/core';

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
 * Angular function for monitoring network connectivity and characteristics
 * @returns Network state information
 */
export function useNetwork(): UseNetworkReturn {
  const networkStateSignal = signal<NetworkState>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    since: new Date(),
  });

  const updateNetworkState = () => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const currentState = networkStateSignal();
    const newSince =
      online !== currentState.online ? new Date() : currentState.since;

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

    networkStateSignal.set({
      online,
      since: newSince,
      ...connectionInfo,
    });
  };

  // Initialize and set up event listeners
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

  // Return the current state and a cleanup function
  const cleanup = () => {
    window.removeEventListener('online', updateNetworkState);
    window.removeEventListener('offline', updateNetworkState);

    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.removeEventListener) {
        connection.removeEventListener('change', updateNetworkState);
      }
    }
  };

  return {
    get online() {
      return networkStateSignal().online;
    },
    get since() {
      return networkStateSignal().since;
    },
    get type() {
      return networkStateSignal().type;
    },
    get downlink() {
      return networkStateSignal().downlink;
    },
    get downlinkMax() {
      return networkStateSignal().downlinkMax;
    },
    get effectiveType() {
      return networkStateSignal().effectiveType;
    },
    get rtt() {
      return networkStateSignal().rtt;
    },
    get saveData() {
      return networkStateSignal().saveData;
    },
  };
}
