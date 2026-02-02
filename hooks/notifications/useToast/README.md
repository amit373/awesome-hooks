# useToast

A React, Vue, and Angular hook/composable/service for managing toast notifications.

## Features

- Display toast notifications with customizable types and positions
- Support for auto-dismissal with configurable duration
- Ability to manually dismiss specific toasts
- Clear all toasts functionality
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useToast/react

# Vue
npm install @myhooks/useToast/vue

# Angular
npm install @myhooks/useToast/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useToast } from '@myhooks/useToast/react';

const MyComponent = () => {
  const { toasts, addToast, removeToast, clearToasts } = useToast('top-right');

  const showSuccessToast = () => {
    addToast('Operation completed successfully!', { 
      type: 'success', 
      duration: 5000 
    });
  };

  const showErrorToast = () => {
    addToast('An error occurred!', { 
      type: 'error', 
      position: 'bottom-left' 
    });
  };

  return (
    <div>
      <button onClick={showSuccessToast}>Show Success Toast</button>
      <button onClick={showErrorToast}>Show Error Toast</button>
      <button onClick={clearToasts}>Clear All Toasts</button>
      
      <div className="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <button @click="showSuccessToast">Show Success Toast</button>
    <button @click="showErrorToast">Show Error Toast</button>
    <button @click="clearToasts">Clear All Toasts</button>
    
    <div class="toast-container">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        :class="`toast toast-${toast.type}`"
        @click="removeToast(toast.id)"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@myhooks/useToast/vue';

const { toasts, addToast, removeToast, clearToasts } = useToast('top-right');

const showSuccessToast = () => {
  addToast('Operation completed successfully!', { 
    type: 'success', 
    duration: 5000 
  });
};

const showErrorToast = () => {
  addToast('An error occurred!', { 
    type: 'error', 
    position: 'bottom-left' 
  });
};
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useToast } from '@myhooks/useToast/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <button (click)="showSuccessToast()">Show Success Toast</button>
      <button (click)="showErrorToast()">Show Error Toast</button>
      <button (click)="clearToasts()">Clear All Toasts</button>
      
      <div class="toast-container">
        <div 
          *ngFor="let toast of hook.toasts"
          [class]="'toast toast-' + toast.type"
          (click)="hook.removeToast(toast.id)"
        >
          {{ toast.message }}
        </div>
      </div>
    </div>
  `
})
export class MyComponent {
  hook = useToast('top-right');

  showSuccessToast() {
    this.hook.addToast('Operation completed successfully!', { 
      type: 'success', 
      duration: 5000 
    });
  }

  showErrorToast() {
    this.hook.addToast('An error occurred!', { 
      type: 'error', 
      position: 'bottom-left' 
    });
  }

  clearToasts() {
    this.hook.clearToasts();
  }
}
```

## API

### Parameters

- `defaultPosition`: (Optional) Default position for toasts (default: 'top-right')

### Return Values

- `toasts`: Array of current toast objects
- `addToast`: Function to add a new toast notification
- `removeToast`: Function to remove a specific toast by ID
- `clearToasts`: Function to clear all toasts

## Toast Options

- `type`: Type of toast ('success', 'error', 'warning', 'info')
- `position`: Position of toast ('top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center')
- `duration`: Duration in milliseconds before auto-dismissal (0 for no auto-dismissal)

## License

MIT © Tri Hooks Team