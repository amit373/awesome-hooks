# useBattery

A React, Vue, and Angular hook/composable/service for monitoring battery status.

## Features

- Monitor device battery level
- Track charging status
- Get charging and discharging time estimates
- Handle battery API availability detection
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useBattery/react

# Vue
npm install @myhooks/useBattery/vue

# Angular
npm install @myhooks/useBattery/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useBattery } from '@myhooks/useBattery/react';

const MyComponent = () => {
  const { isSupported, battery, error } = useBattery();

  if (!isSupported) {
    return <div>Battery Status API is not supported in your browser</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!battery) {
    return <div>Detecting battery status...</div>;
  }

  return (
    <div>
      <p>Battery Level: {Math.round(battery.level! * 100)}%</p>
      <p>Charging: {battery.charging ? 'Yes' : 'No'}</p>
      <p>Charging Time: {battery.chargingTime}s</p>
      <p>Discharging Time: {battery.dischargingTime}s</p>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <div v-if="!isSupported">Battery Status API is not supported in your browser</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="!battery">Detecting battery status...</div>
    <div v-else>
      <p>Battery Level: {{ Math.round(battery.level * 100) }}%</p>
      <p>Charging: {{ battery.charging ? 'Yes' : 'No' }}</p>
      <p>Charging Time: {{ battery.chargingTime }}s</p>
      <p>Discharging Time: {{ battery.dischargingTime }}s</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBattery } from '@myhooks/useBattery/vue';

const { isSupported, battery, error } = useBattery();
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useBattery } from '@myhooks/useBattery/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <div *ngIf="!isSupported">Battery Status API is not supported in your browser</div>
      <div *ngIf="error">Error: {{ error.message }}</div>
      <div *ngIf="!hook.battery">Detecting battery status...</div>
      <div *ngIf="hook.battery">
        <p>Battery Level: {{ Math.round(hook.battery!.level! * 100) }}%</p>
        <p>Charging: {{ hook.battery!.charging ? 'Yes' : 'No' }}</p>
        <p>Charging Time: {{ hook.battery!.chargingTime }}s</p>
        <p>Discharging Time: {{ hook.battery!.dischargingTime }}s</p>
      </div>
    </div>
  `
})
export class MyComponent {
  hook = useBattery();
}
```

## API

### Return Values

- `isSupported`: Boolean indicating if Battery Status API is supported
- `battery`: Battery state object with:
  - `level`: Battery charge level (0-1) or null if unavailable
  - `charging`: Boolean indicating if device is charging
  - `chargingTime`: Time in seconds until charged or null
  - `dischargingTime`: Time in seconds until discharged or Infinity
- `error`: Error object if battery API fails

## Browser Compatibility

This hook uses the Battery Status API which is supported in:
- Chrome 38+
- Firefox 10+
- Opera 25+
- Samsung Internet 3.0+

Note: Safari and newer versions of Firefox have deprecated this API for privacy/security reasons.

## Security Considerations

The Battery Status API can potentially be used for fingerprinting. Modern browsers are phasing out this API in favor of privacy concerns.

## License

MIT © Tri Hooks Team