# useNetwork

A hook for monitoring network connectivity status and characteristics such as connection type, speed, and data saving preferences.

## Problem

Detecting network status changes and connection quality requires manual event listeners and complex state management. This hook provides a unified interface for network awareness across all frameworks.

## When to Use

- Offline/online status detection
- Connection quality awareness
- Adaptive content loading based on network speed
- Data-saving mode detection
- Network-aware user experiences

## API Reference

### React

```typescript
const {
  online,
  since,
  type,
  downlink,
  downlinkMax,
  effectiveType,
  rtt,
  saveData,
} = useNetwork();
```

### Vue

```typescript
const {
  online,
  since,
  type,
  downlink,
  downlinkMax,
  effectiveType,
  rtt,
  saveData,
} = useNetwork();
```

### Angular

```typescript
const {
  online,
  since,
  type,
  downlink,
  downlinkMax,
  effectiveType,
  rtt,
  saveData,
} = useNetwork();
```

**Returns:**

- `online` (boolean): Whether the browser is currently online
- `since` (Date | undefined): Timestamp when online/offline status last changed
- `type` (string | undefined): Network connection type (bluetooth, cellular, ethernet, wifi, etc.)
- `downlink` (number | undefined): Effective bandwidth estimate in Mbps
- `downlinkMax` (number | undefined): Maximum downlink speed in Mbps
- `effectiveType` (string | undefined): Effective connection type (slow-2g, 2g, 3g, 4g)
- `rtt` (number | undefined): Estimated round-trip time in ms
- `saveData` (boolean | undefined): Whether data saving is enabled

## Usage Examples

### React

```tsx
import { useNetwork } from './hooks/device-connectivity/useNetwork/react';

function NetworkStatus() {
  const { online, type, effectiveType, downlink } = useNetwork();

  return (
    <div>
      <p>Status: {online ? 'Online' : 'Offline'}</p>
      <p>Connection Type: {type || 'Unknown'}</p>
      <p>Effective Speed: {effectiveType || 'Unknown'}</p>
      {downlink && <p>Download Speed: {downlink} Mbps</p>}
    </div>
  );
}

function App() {
  const { online, effectiveType } = useNetwork();

  return (
    <div>
      <NetworkStatus />
      <div className={`app ${!online ? 'offline' : ''}`}>
        {effectiveType === 'slow-2g' && (
          <div>Slow connection detected - optimizing content...</div>
        )}
        {/* App content */}
      </div>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useNetwork } from './hooks/device-connectivity/useNetwork/vue';

const { online, type, effectiveType, downlink } = useNetwork();
</script>

<template>
  <div>
    <p>Status: {{ online ? 'Online' : 'Offline' }}</p>
    <p>Connection Type: {{ type || 'Unknown' }}</p>
    <p>Effective Speed: {{ effectiveType || 'Unknown' }}</p>
    <p v-if="downlink">Download Speed: {{ downlink }} Mbps</p>

    <div v-if="effectiveType === 'slow-2g'">
      Slow connection detected - optimizing content...
    </div>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useNetwork } from './hooks/device-connectivity/useNetwork/angular';

@Component({
  selector: 'app-network-status',
  template: `
    <div>
      <p>Status: {{ online ? 'Online' : 'Offline' }}</p>
      <p>Connection Type: {{ type || 'Unknown' }}</p>
      <p>Effective Speed: {{ effectiveType || 'Unknown' }}</p>
      <p *ngIf="downlink">Download Speed: {{ downlink }} Mbps</p>

      <div *ngIf="effectiveType === 'slow-2g'">
        Slow connection detected - optimizing content...
      </div>
    </div>
  `,
})
export class NetworkStatusComponent {
  private networkHook = useNetwork();

  get online() {
    return this.networkHook.online;
  }

  get type() {
    return this.networkHook.type;
  }

  get effectiveType() {
    return this.networkHook.effectiveType;
  }

  get downlink() {
    return this.networkHook.downlink;
  }
}
```

## Browser Support

Modern browsers with Network Information API (limited support, primarily Chrome and Edge). Falls back to basic online/offline detection in other browsers.

## Edge Cases Handled

- Graceful degradation when Network Information API is not available
- Proper cleanup of event listeners on component unmount
- Type safety with optional properties
- SSR-safe implementation (returns online=true initially on server)

## Cleanup Guarantees

- React: useEffect cleanup removes event listeners
- Vue: onUnmounted cleanup removes event listeners
- Angular: Manual cleanup function provided (should be called when appropriate)

## Angular Implementation Details

Uses Angular Signals for reactive state management. The hook returns getter functions for each property to maintain reactivity while exposing the data in a clean interface.
