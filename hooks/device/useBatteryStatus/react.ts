import { useState, useEffect } from 'react';

interface BatteryState {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

export function useBatteryStatus() {
  const [battery, setBattery] = useState<BatteryState | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (!navigator.getBattery) return;

    // @ts-ignore
    navigator.getBattery().then((bat: any) => {
      const updateBattery = () => {
        setBattery({
          charging: bat.charging,
          level: bat.level,
          chargingTime: bat.chargingTime,
          dischargingTime: bat.dischargingTime,
        });
      };

      updateBattery();
      bat.addEventListener('levelchange', updateBattery);
      bat.addEventListener('chargingchange', updateBattery);
      
      return () => {
        bat.removeEventListener('levelchange', updateBattery);
        bat.removeEventListener('chargingchange', updateBattery);
      };
    });
  }, []);

  return battery;
}
