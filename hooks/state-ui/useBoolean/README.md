# useBoolean

A React, Vue, and Angular hook/composable/service for managing boolean state with convenience methods.

## Features

- Manage boolean state with ease
- Convenience methods for toggling and setting values
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useBoolean/react

# Vue
npm install @myhooks/useBoolean/vue

# Angular
npm install @myhooks/useBoolean/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useBoolean } from '@myhooks/useBoolean/react';

const MyComponent = () => {
  const { value, toggle, setTrue, setFalse, setValue } = useBoolean(false);

  return (
    <div>
      <p>Current value: {value.toString()}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
      <button onClick={() => setValue(!value)}>Set Opposite</button>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <p>Current value: {{ value }}</p>
    <button @click="toggle">Toggle</button>
    <button @click="setTrue">Set True</button>
    <button @click="setFalse">Set False</button>
    <button @click="() => setValue(!value)">Set Opposite</button>
  </div>
</template>

<script setup lang="ts">
import { useBoolean } from '@myhooks/useBoolean/vue';

const { value, toggle, setTrue, setFalse, setValue } = useBoolean(false);
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useBoolean } from '@myhooks/useBoolean/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <p>Current value: {{ value }}</p>
      <button (click)="toggle()">Toggle</button>
      <button (click)="setTrue()">Set True</button>
      <button (click)="setFalse()">Set False</button>
      <button (click)="setValue(!value)">Set Opposite</button>
    </div>
  `
})
export class MyComponent {
  private hook = useBoolean(false);
  value = this.hook.value;
  toggle = this.hook.toggle;
  setTrue = this.hook.setTrue;
  setFalse = this.hook.setFalse;
  setValue = this.hook.setValue;
}
```

## API

### Parameters

- `initialValue?`: (Optional) The initial boolean value (default: false)

### Return Values

- `value`: The current boolean value
- `toggle`: Function to toggle the boolean value
- `setTrue`: Function to set the value to true
- `setFalse`: Function to set the value to false
- `setValue`: Function to set the value to a specific boolean value

## License

MIT © Tri Hooks Team