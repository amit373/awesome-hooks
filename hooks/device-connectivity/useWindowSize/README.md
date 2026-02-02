# useWindowSize

A React, Vue, and Angular hook/composable/service for tracking window size in real-time.

## Features

- Tracks window dimensions in real-time
- Provides width and height values
- Handles cleanup to prevent memory leaks
- SSR-safe implementation
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useWindowSize/react

# Vue
npm install @myhooks/useWindowSize/vue

# Angular
npm install @myhooks/useWindowSize/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useWindowSize } from '@myhooks/useWindowSize/react';

const MyComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window size: {width} x {height}</p>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <p>Window size: {{ width }} x {{ height }}</p>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@myhooks/useWindowSize/vue';

const { width, height } = useWindowSize();
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useWindowSize } from '@myhooks/useWindowSize/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <p>Window size: {{ size.width }} x {{ size.height }}</p>
    </div>
  `
})
export class MyComponent {
  size = useWindowSize();
}
```

## API

### Return Value

- `width`: Number representing the width of the window
- `height`: Number representing the height of the window

## Browser Compatibility

This hook works in all modern browsers that support the Window API.

## License

MIT © Tri Hooks Team