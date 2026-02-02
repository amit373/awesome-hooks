# useLocalStorage

A hook for managing state with localStorage persistence across browser sessions with type safety and error handling.

## Problem

Storing persistent data in localStorage requires manual serialization/deserialization, error handling, and synchronization between components. This hook provides a seamless API that feels like regular state management.

## When to Use

- User preferences and settings
- Shopping cart data
- Form data persistence
- Theme selection
- Authentication tokens
- Application state persistence

## API Reference

### React

```typescript
const { value, setValue, removeValue, error } = useLocalStorage(key, initialValue?)
```

### Vue

```typescript
const { value, setValue, removeValue, error } = useLocalStorage(key, initialValue?)
```

### Angular

```typescript
const { value, setValue, removeValue, error } = useLocalStorage(key, initialValue?)
```

**Parameters:**

- `key` (string): The localStorage key to use
- `initialValue` (any, optional): Initial value to use if key doesn't exist (default: `null`)

**Returns:**

- `value` (T | null): Current stored value
- `setValue(value: T | null)`: Function to update stored value
- `removeValue()`: Function to remove the key from localStorage
- `error` (Error | null): Error if localStorage operation failed

## Usage Examples

### React

```tsx
import { useLocalStorage } from './hooks/storage/useLocalStorage/react';

function UserPreferences() {
  const {
    value: theme,
    setValue: setTheme,
    error,
  } = useLocalStorage<string>('theme', 'light');
  const { value: notifications, setValue: setNotifications } =
    useLocalStorage<boolean>('notifications', true);

  if (error) {
    return <div>Error accessing localStorage: {error.message}</div>;
  }

  return (
    <div>
      <h2>User Preferences</h2>
      <div>
        <label>
          Theme:
          <select
            value={theme || 'light'}
            onChange={e => setTheme(e.target.value as 'light' | 'dark')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifications || false}
            onChange={e => setNotifications(e.target.checked)}
          />
          Enable Notifications
        </label>
      </div>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useLocalStorage } from './hooks/storage/useLocalStorage/vue';

const {
  value: theme,
  setValue: setTheme,
  error,
} = useLocalStorage('theme', 'light');
const { value: notifications, setValue: setNotifications } = useLocalStorage(
  'notifications',
  true
);
</script>

<template>
  <div>
    <h2>User Preferences</h2>
    <div v-if="error">Error accessing localStorage: {{ error.message }}</div>
    <div>
      <label>
        Theme:
        <select
          :value="theme || 'light'"
          @change="e => setTheme(e.target.value)"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          :checked="notifications || false"
          @change="e => setNotifications(e.target.checked)"
        />
        Enable Notifications
      </label>
    </div>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useLocalStorage } from './hooks/storage/useLocalStorage/angular';

@Component({
  selector: 'app-user-preferences',
  template: `
    <div>
      <h2>User Preferences</h2>
      <div *ngIf="error">Error accessing localStorage: {{ error.message }}</div>
      <div>
        <label>
          Theme:
          <select
            [value]="theme || 'light'"
            (change)="setTheme($any($event.target).value)"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            [checked]="notifications || false"
            (change)="setNotifications($any($event.target).checked)"
          />
          Enable Notifications
        </label>
      </div>
    </div>
  `,
})
export class UserPreferencesComponent {
  private themeHook = useLocalStorage<string>('theme', 'light');
  private notificationsHook = useLocalStorage<boolean>('notifications', true);

  get theme() {
    return this.themeHook.value;
  }
  setTheme = this.themeHook.setValue;

  get notifications() {
    return this.notificationsHook.value;
  }
  setNotifications = this.notificationsHook.setValue;

  get error() {
    return this.themeHook.error;
  }
}
```

## Browser Support

Modern browsers supporting localStorage API and JSON (all modern browsers)

## Edge Cases Handled

- Serialization/deserialization of complex objects
- Error handling for localStorage quota exceeded
- Synchronization across tabs/windows
- Type safety with generics
- SSR-safe implementation (returns null initially on server)

## Cleanup Guarantees

- React: useEffect cleanup removes event listeners
- Vue: onUnmounted cleanup removes event listeners
- Angular: Manual cleanup function provided (should be called in ngOnDestroy)

## Angular Implementation Details

Uses Angular Signals for reactive state management. The event listeners are set up once during initialization and persist until manually cleaned up. In a real application, you'd typically call the cleanup function in ngOnDestroy.
