# useGeolocation

A React, Vue, and Angular hook/composable/service for accessing geolocation information.

## Features

- Access device location information
- Supports both one-time and continuous position tracking
- Handles geolocation errors gracefully
- Provides support detection
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useGeolocation/react

# Vue
npm install @myhooks/useGeolocation/vue

# Angular
npm install @myhooks/useGeolocation/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useGeolocation } from '@myhooks/useGeolocation/react';

const MyComponent = () => {
  const {
    position,
    error,
    isSupported,
    getCurrentPosition,
    watchPosition,
    clearWatch
  } = useGeolocation({ enableHighAccuracy: true });

  if (!isSupported) {
    return <div>Geolocation is not supported in your browser</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {position ? (
        <div>
          <p>Latitude: {position.coords.latitude}</p>
          <p>Longitude: {position.coords.longitude}</p>
          <p>Accuracy: {position.coords.accuracy} meters</p>
        </div>
      ) : (
        <p>Getting your location...</p>
      )}
      <button onClick={getCurrentPosition}>Get Location</button>
      <button onClick={watchPosition}>Start Watching</button>
      <button onClick={clearWatch}>Stop Watching</button>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <div v-if="!isSupported">Geolocation is not supported in your browser</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-if="position">
        <p>Latitude: {{ position.coords.latitude }}</p>
        <p>Longitude: {{ position.coords.longitude }}</p>
        <p>Accuracy: {{ position.coords.accuracy }} meters</p>
      </div>
      <p v-else>Getting your location...</p>
      <button @click="getCurrentPosition">Get Location</button>
      <button @click="watchPosition">Start Watching</button>
      <button @click="clearWatch">Stop Watching</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeolocation } from '@myhooks/useGeolocation/vue';

const {
  position,
  error,
  isSupported,
  getCurrentPosition,
  watchPosition,
  clearWatch
} = useGeolocation({ enableHighAccuracy: true });
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useGeolocation } from '@myhooks/useGeolocation/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <div *ngIf="!isSupported">Geolocation is not supported in your browser</div>
      <div *ngIf="error">Error: {{ error.message }}</div>
      <div *ngIf="isSupported && !error">
        <div *ngIf="position; else gettingLocation">
          <p>Latitude: {{ position.coords.latitude }}</p>
          <p>Longitude: {{ position.coords.longitude }}</p>
          <p>Accuracy: {{ position.coords.accuracy }} meters</p>
        </div>
        <ng-template #gettingLocation>
          <p>Getting your location...</p>
        </ng-template>
        <button (click)="getCurrentPosition()">Get Location</button>
        <button (click)="watchPosition()">Start Watching</button>
        <button (click)="clearWatch()">Stop Watching</button>
      </div>
    </div>
  `
})
export class MyComponent {
  private hook = useGeolocation({ enableHighAccuracy: true });
  position = this.hook.position;
  error = this.hook.error;
  isSupported = this.hook.isSupported;
  getCurrentPosition = this.hook.getCurrentPosition;
  watchPosition = this.hook.watchPosition;
  clearWatch = this.hook.clearWatch;
}
```

## API

### Parameters

- `options?`: (Optional) Geolocation API options
  - `enableHighAccuracy`: Boolean to enable high accuracy mode
  - `timeout`: Maximum time to wait for position (milliseconds)
  - `maximumAge`: Maximum age of cached position (milliseconds)

### Return Values

- `position`: Current position object with coordinates and timestamp
- `error`: Error object if geolocation fails
- `isSupported`: Boolean indicating if geolocation is supported
- `getCurrentPosition`: Function to get current position once
- `watchPosition`: Function to watch for position changes
- `clearWatch`: Function to stop watching position

## Browser Compatibility

This hook uses the Geolocation API which is supported in all modern browsers:
- Chrome 5+
- Firefox 3.5+
- Safari 5+
- Edge 12+
- Opera 11.6+

## Security Considerations

The Geolocation API requires user permission to access location data. Make sure to handle the permission prompt appropriately in your application.

## License

MIT © Tri Hooks Team