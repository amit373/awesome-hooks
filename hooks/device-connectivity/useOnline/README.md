# useOnline

A hook for monitoring the browser's online/offline status with automatic event handling.

## Problem

Detecting when a user goes offline or comes back online requires manual event listeners and state management. This hook provides a simple reactive value for online status.

## When to Use

- Showing offline indicators
- Pausing sync operations when offline
- Alerting users to connection status
- Conditional feature availability based on connectivity
- Optimizing data usage when offline

## API Reference

### React

```typescript
const isOnline = useOnline();
```

### Vue

```typescript
const isOnline = useOnline();
```

### Angular

```typescript
const isOnline = useOnline();
```

**Returns:**

- `isOnline` (boolean): Current online status of the browser

## Usage Examples

### React

```tsx
import { useOnline } from './hooks/device-connectivity/useOnline/react';

function StatusBar() {
  const isOnline = useOnline();

  return (
    <div className="status-bar">
      <span className={isOnline ? 'online' : 'offline'}>
        {isOnline ? '● Online' : '○ Offline'}
      </span>
    </div>
  );
}

function App() {
  const isOnline = useOnline();

  return (
    <div>
      <StatusBar />
      <div className={`app ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? (
          <div>Connected to the internet</div>
        ) : (
          <div>You are currently offline. Some features may be limited.</div>
        )}
      </div>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useOnline } from './hooks/device-connectivity/useOnline/vue';

const isOnline = useOnline();
</script>

<template>
  <div class="status-bar">
    <span :class="isOnline ? 'online' : 'offline'">
      {{ isOnline ? '● Online' : '○ Offline' }}
    </span>
  </div>

  <div :class="['app', isOnline ? 'online' : 'offline']">
    <div v-if="isOnline">Connected to the internet</div>
    <div v-else>You are currently offline. Some features may be limited.</div>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useOnline } from './hooks/device-connectivity/useOnline/angular';

@Component({
  selector: 'app-status-bar',
  template: `
    <div class="status-bar">
      <span [class]="isOnline ? 'online' : 'offline'">
        {{ isOnline ? '● Online' : '○ Offline' }}
      </span>
    </div>

    <div [class]="['app', isOnline ? 'online' : 'offline']">
      <div *ngIf="isOnline">Connected to the internet</div>
      <div *ngIf="!isOnline">
        You are currently offline. Some features may be limited.
      </div>
    </div>
  `,
})
export class StatusBarComponent {
  isOnline = useOnline();
}
```

## Browser Support

All modern browsers supporting NavigatorOnLine API (all modern browsers)

## Edge Cases Handled

- Proper cleanup of event listeners on component unmount
- SSR-safe implementation (defaults to online on server)
- Type safety with boolean return value

## Cleanup Guarantees

- React: useEffect cleanup removes event listeners
- Vue: onUnmounted cleanup removes event listeners
- Angular: Manual cleanup should be handled by consumer

## Angular Implementation Details

Returns the current value directly. For full reactivity in Angular, you would typically wrap this in a signal or use it within an effect context.
