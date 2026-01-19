# useBatteryStatus

## Explanation
Accesses the Battery Status API to read the device's battery level and charging state. Useful for power-saving modes.

## Usage

### React
```tsx
const battery = useBatteryStatus();
// {battery && <div>{battery.level * 100}%</div>}
```

### Angular
```typescript
this.batteryService.battery$.subscribe(bat => ...);
```

### Vue
```vue
<script setup>
const battery = useBatteryStatus();
</script>
<!-- <div v-if="battery">{{ battery.level }}</div> -->
```

🔋 Power up with #useBatteryStatus

Building a resource-intensive app? Check the user's battery first.

React snippet:
```tsx
const battery = useBatteryStatus();

if (battery && battery.level < 0.2 && !battery.charging) {
  enablePowerSaverMode();
}
```

Be kind to your user's device. 🌱

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/device/useBatteryStatus


#webapi #performance #react #mobile
