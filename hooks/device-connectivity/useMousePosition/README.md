# useMousePosition

A React, Vue, and Angular hook/composable/service for tracking mouse position in real-time.

## Features

- Tracks mouse position in real-time
- Provides x and y coordinates
- Handles cleanup to prevent memory leaks
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useMousePosition/react

# Vue
npm install @myhooks/useMousePosition/vue

# Angular
npm install @myhooks/useMousePosition/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useMousePosition } from '@myhooks/useMousePosition/react';

const MyComponent = () => {
  const { x, y } = useMousePosition();

  return (
    <div>
      <p>Mouse position: {x}, {y}</p>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <p>Mouse position: {{ x }}, {{ y }}</p>
  </div>
</template>

<script setup lang="ts">
import { useMousePosition } from '@myhooks/useMousePosition/vue';

const { x, y } = useMousePosition();
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useMousePosition } from '@myhooks/useMousePosition/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <p>Mouse position: {{ position.x }}, {{ position.y }}</p>
    </div>
  `
})
export class MyComponent {
  position = useMousePosition();
}
```

## API

### Return Value

- `x`: Number representing the x coordinate of the mouse
- `y`: Number representing the y coordinate of the mouse

## Browser Compatibility

This hook works in all modern browsers that support the MouseEvent API.

## License

MIT © Tri Hooks Team