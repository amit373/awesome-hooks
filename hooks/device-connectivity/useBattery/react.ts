import { useEffect, useState } from 'react';

interface BatteryState {
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

interface UseBatteryReturn {
  isSupported: boolean;
  battery: BatteryState | null;
  error: Error | null;
}

/**
 * React hook for monitoring battery status
 * @returns Battery state information and support status
 */
export function useBattery(): UseBatteryReturn {
  const [state, setState] = useState<BatteryState | null>(null);
  const [isSupported, setIsSupported] = useState(false); // Initially assume not supported
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const nav = navigator as any;
    if (typeof nav.getBattery !== 'function') {
      setIsSupported(false);
      setError(new Error('Battery Status API not supported'));
      return;
    }

    let battery: any;

    const handleBatteryUpdate = () => {
      if (battery) {
        setState({
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        });
      }
    };

    nav
      .getBattery()
      .then((bat: any) => {
        // If we reach here, the API is supported
        setIsSupported(true);
        setError(null); // Clear any previous error

        battery = bat;

        setState({
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        });

        battery.addEventListener('levelchange', handleBatteryUpdate);
        battery.addEventListener('chargingchange', handleBatteryUpdate);
        battery.addEventListener('chargingtimechange', handleBatteryUpdate);
        battery.addEventListener('dischargingtimechange', handleBatteryUpdate);
      })
      .catch((err: any) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsSupported(false);
      });

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', handleBatteryUpdate);
        battery.removeEventListener('chargingchange', handleBatteryUpdate);
        battery.removeEventListener('chargingtimechange', handleBatteryUpdate);
        battery.removeEventListener(
          'dischargingtimechange',
          handleBatteryUpdate
        );
      }
    };
  }, []);

  return { isSupported, battery: state, error };
}
