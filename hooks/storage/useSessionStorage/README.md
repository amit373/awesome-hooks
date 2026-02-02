# useSessionStorage

A React, Vue, and Angular hook/service that provides a reactive interface to the browser's sessionStorage API. Automatically synchronizes state with sessionStorage and handles serialization/deserialization of complex objects.

## Features

- **Reactive storage**: Automatically syncs state with sessionStorage
- **Cross-framework support**: Available for React, Vue 3, and Angular
- **Tree-shakable**: Only import what you need
- **SSR-friendly**: Safe to use in server-side rendered applications
- **Automatic serialization**: Handles complex objects and primitives
- **TypeScript ready**: Fully typed with proper type inference
- **Error handling**: Graceful degradation when sessionStorage is unavailable

## Installation

```bash
npm install your-hooks-library
```

## Usage

### React
```tsx
import { useSessionStorage } from 'your-hooks-library/react';

function MyComponent() {
  const {
    value: userPreferences,
    set: setUserPreferences,
    remove: removeUserPreferences,
    update: updateUserPreferences
  } = useSessionStorage('user-prefs', { theme: 'light', language: 'en' });

  const toggleTheme = () => {
    updateUserPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  return (
    <div>
      <p>Current theme: {userPreferences?.theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={removeUserPreferences}>Reset Preferences</button>
    </div>
  );
}
```

### Vue 3
```vue
<script setup>
import { useSessionStorage } from 'your-hooks-library/vue';

const {
  value: userPreferences,
  set: setUserPreferences,
  remove: removeUserPreferences,
  update: updateUserPreferences
} = useSessionStorage('user-prefs', { theme: 'light', language: 'en' });

const toggleTheme = () => {
  updateUserPreferences(prev => ({
    ...prev,
    theme: prev.theme === 'light' ? 'dark' : 'light'
  }));
};
</script>

<template>
  <div>
    <p>Current theme: {{ userPreferences?.theme }}</p>
    <button @click="toggleTheme">Toggle Theme</button>
    <button @click="removeUserPreferences">Reset Preferences</button>
  </div>
</template>
```

### Angular
```typescript
import { Component } from '@angular/core';
import { SessionStorageService } from 'your-hooks-library/angular';

@Component({
  template: `
    <div>
      <p>Current theme: {{ userPreferences()?.theme }}</p>
      <button (click)="toggleTheme()">Toggle Theme</button>
      <button (click)="removeUserPreferences()">Reset Preferences</button>
    </div>
  `
})
export class MyComponent {
  private sessionStorageService = new SessionStorageService();
  
  private storageState = this.sessionStorageService.useSessionStorage(
    'user-prefs', 
    { theme: 'light', language: 'en' }
  );
  
  userPreferences = this.storageState.value;
  
  setUserPreferences = this.storageState.set;
  removeUserPreferences = this.storageState.remove;
  updateUserPreferences = this.storageState.update;
  
  toggleTheme() {
    this.updateUserPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  }
}
```

## API

### Parameters

- `key` (string): The sessionStorage key to manage
- `initialValue` (any, optional): The initial value to use if nothing is stored

### Return Value

Returns an object with:

- `value` (any): The current value from sessionStorage
- `set(value)`: Function to set a new value in sessionStorage
- `remove()`: Function to remove the value from sessionStorage
- `update(updater)`: Function to update the value using an updater function

## Browser Compatibility

- Chrome 5+
- Firefox 3.5+
- Safari 4+
- Edge 12+
- Internet Explorer 8+

## License

MIT