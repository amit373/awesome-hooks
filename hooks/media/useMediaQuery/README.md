# useMediaQuery

A React, Vue, and Angular hook/composable/service for using CSS media queries.

## Features

- React to CSS media query changes in JavaScript
- Supports all standard CSS media queries
- Handles browser compatibility for older APIs
- Provides real-time updates when query matches change
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useMediaQuery/react

# Vue
npm install @myhooks/useMediaQuery/vue

# Angular
npm install @myhooks/useMediaQuery/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useMediaQuery } from '@myhooks/useMediaQuery/react';

const MyComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isHighContrast = useMediaQuery('(prefers-contrast: high)');

  return (
    <div>
      <p>Is mobile: {isMobile ? 'Yes' : 'No'}</p>
      <p>Is dark mode: {isDarkMode ? 'Yes' : 'No'}</p>
      <p>Is high contrast: {isHighContrast ? 'Yes' : 'No'}</p>
      
      {isMobile && <div>Mobile layout content</div>}
      {!isMobile && <div>Desktop layout content</div>}
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <p>Is mobile: {{ isMobile ? 'Yes' : 'No' }}</p>
    <p>Is dark mode: {{ isDarkMode ? 'Yes' : 'No' }}</p>
    <p>Is high contrast: {{ isHighContrast ? 'Yes' : 'No' }}</p>
    
    <div v-if="isMobile">Mobile layout content</div>
    <div v-else>Desktop layout content</div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@myhooks/useMediaQuery/vue';

const isMobile = useMediaQuery('(max-width: 768px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
const isHighContrast = useMediaQuery('(prefers-contrast: high)');
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useMediaQuery } from '@myhooks/useMediaQuery/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <p>Is mobile: {{ isMobile ? 'Yes' : 'No' }}</p>
      <p>Is dark mode: {{ isDarkMode ? 'Yes' : 'No' }}</p>
      <p>Is high contrast: {{ isHighContrast ? 'Yes' : 'No' }}</p>
      
      <div *ngIf="isMobile">Mobile layout content</div>
      <div *ngIf="!isMobile">Desktop layout content</div>
    </div>
  `
})
export class MyComponent {
  isMobile = useMediaQuery('(max-width: 768px)');
  isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  isHighContrast = useMediaQuery('(prefers-contrast: high)');
}
```

## API

### Parameters

- `query`: CSS media query string (e.g., '(max-width: 768px)', '(min-width: 1024px) and (max-width: 1200px)')

### Return Value

- `matches`: Boolean indicating if the media query currently matches

## Common Media Queries

- `(max-width: 768px)` - Mobile devices
- `(min-width: 769px) and (max-width: 1024px)` - Tablets
- `(min-width: 1025px)` - Desktop
- `(prefers-color-scheme: dark)` - Dark mode preference
- `(prefers-reduced-motion: reduce)` - Reduced motion preference
- `(orientation: landscape)` - Landscape orientation
- `(hover: hover)` - Device supports hover

## Browser Compatibility

This hook uses the Window.matchMedia API which is supported in all modern browsers:
- Chrome 9+
- Firefox 6+
- Safari 5.1+
- Edge 12+
- Opera 12.1+

## License

MIT © Tri Hooks Team