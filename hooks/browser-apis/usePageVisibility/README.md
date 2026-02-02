# usePageVisibility

A React, Vue, and Angular hook/composable/service for tracking page visibility state.

## Features

- Tracks whether the page is currently visible or hidden
- Automatically updates when the page visibility changes
- Handles cleanup to prevent memory leaks
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/usePageVisibility/react

# Vue
npm install @myhooks/usePageVisibility/vue

# Angular
npm install @myhooks/usePageVisibility/angular
```

## Usage

### React

```tsx
import React from 'react';
import { usePageVisibility } from '@myhooks/usePageVisibility/react';

const MyComponent = () => {
  const isVisible = usePageVisibility();

  return (
    <div>
      <p>Page is currently {isVisible ? 'visible' : 'hidden'}</p>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <p>Page is currently {{ isVisible ? 'visible' : 'hidden' }}</p>
  </div>
</template>

<script setup lang="ts">
import { usePageVisibility } from '@myhooks/usePageVisibility/vue';

const isVisible = usePageVisibility();
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { usePageVisibility } from '@myhooks/usePageVisibility/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <p>Page is currently {{ isVisible ? 'visible' : 'hidden' }}</p>
    </div>
  `
})
export class MyComponent {
  isVisible = usePageVisibility();
}
```

## API

### Return Value

- `isVisible`: Boolean indicating if the page is currently visible

## Browser Compatibility

This hook uses the Page Visibility API which is supported in all modern browsers:
- Chrome 33+
- Firefox 18+
- Safari 7+
- Edge 12+
- IE 10+

## License

MIT © Tri Hooks Team