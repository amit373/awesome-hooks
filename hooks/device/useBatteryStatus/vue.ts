import { ref, onMounted, onUnmounted } from 'vue';

export function useBatteryStatus() {
  const battery = ref<any>(null);

  onMounted(async () => {
    // @ts-ignore
    if (navigator.getBattery) {
      // @ts-ignore
      const bat = await navigator.getBattery();
      
      const update = () => {
        battery.value = {
          charging: bat.charging,
          level: bat.level,
          chargingTime: bat.chargingTime,
          dischargingTime: bat.dischargingTime,
        };
      };

      update();
      bat.addEventListener('levelchange', update);
      bat.addEventListener('chargingchange', update);
    }
  });

  return battery;
}
