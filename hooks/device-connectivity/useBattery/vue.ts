import { onUnmounted, ref, shallowRef } from 'vue';

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
 * A Vue composable for monitoring battery status
 * @returns Battery state information and support status
 */
export function useBattery(): UseBatteryReturn {
  const batteryState = shallowRef<BatteryState | null>(null);
  const isSupported = ref(true);
  const error = ref<Error | null>(null);

  let battery: any = null;

  if (!('getBattery' in navigator)) {
    isSupported.value = false;
    error.value = new Error('Battery Status API not supported');
  } else {
    const handleBatteryUpdate = () => {
      if (battery) {
        batteryState.value = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      }
    };

    (navigator as any)
      .getBattery()
      .then((bat: any) => {
        battery = bat;

        batteryState.value = {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };

        battery.addEventListener('levelchange', handleBatteryUpdate);
        battery.addEventListener('chargingchange', handleBatteryUpdate);
        battery.addEventListener('chargingtimechange', handleBatteryUpdate);
        battery.addEventListener('dischargingtimechange', handleBatteryUpdate);
      })
      .catch((err: any) => {
        error.value = err instanceof Error ? err : new Error(String(err));
        isSupported.value = false;
      });

    onUnmounted(() => {
      if (battery) {
        battery.removeEventListener('levelchange', handleBatteryUpdate);
        battery.removeEventListener('chargingchange', handleBatteryUpdate);
        battery.removeEventListener('chargingtimechange', handleBatteryUpdate);
        battery.removeEventListener(
          'dischargingtimechange',
          handleBatteryUpdate
        );
      }
    });
  }

  return {
    isSupported: isSupported.value,
    battery: batteryState.value,
    error: error.value,
  };
}
