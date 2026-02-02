import { onMounted, onUnmounted, ref } from 'vue';

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
 * Vue composable for monitoring network connectivity and characteristics
 * @returns Network state information
 */
export function useNetwork(): UseNetworkReturn {
  const networkState = ref<NetworkState>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    since: new Date(),
  });

  const updateNetworkState = () => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const newSince =
      online !== networkState.value.online
        ? new Date()
        : networkState.value.since;

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

    networkState.value = {
      online,
      since: newSince,
      ...connectionInfo,
    };
  };

  onMounted(() => {
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
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkState);
    window.removeEventListener('offline', updateNetworkState);

    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.removeEventListener) {
        connection.removeEventListener('change', updateNetworkState);
      }
    }
  });

  return networkState.value;
}
