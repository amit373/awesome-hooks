# useThrottle

A utility hook for throttling function calls, limiting the rate at which a function can be executed.

## Problem

Frequent function calls (like scroll, resize, or mousemove events) can cause performance issues. Throttling ensures the function executes at most once per specified time interval.

## When to Use

- Scroll event handlers
- Window resize handlers
- Mouse movement tracking
- Rate-limited API calls
- Animation frame callbacks

## API Reference

### React

```typescript
const throttledFunction = useThrottle(callback, delay?)
```

### Vue

```typescript
const throttledFunction = useThrottle(callback, delay?)
```

### Angular

```typescript
const throttledFunction = useThrottle(callback, delay?)
```

**Parameters:**

- `callback` (function): Function to throttle
- `delay` (number, optional): Throttle delay in milliseconds (default: `300`)

**Returns:**

- `throttledFunction`: The throttled version of the input function

## Usage Examples

### React

```tsx
import { useState } from 'react';
import { useThrottle } from './hooks/data-async/useThrottle/react';

function ScrollTracker() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    console.log('Scrolled to:', position);
  };

  const throttledScrollHandler = useThrottle(handleScroll, 200);

  return (
    <div onScroll={throttledScrollHandler}>
      <p>Scroll Position: {scrollPosition}px</p>
      <div style={{ height: '200vh', width: '100%' }}>
        Scroll down to see throttled events
      </div>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { ref } from 'vue';
import { useThrottle } from './hooks/data-async/useThrottle/vue';

const scrollPosition = ref(0);

const handleScroll = () => {
  const position = window.scrollY;
  scrollPosition.value = position;
  console.log('Scrolled to:', position);
};

const throttledScrollHandler = useThrottle(handleScroll, 200);
</script>

<template>
  <div @scroll="throttledScrollHandler">
    <p>Scroll Position: {{ scrollPosition }}px</p>
    <div style="height: 200vh; width: 100%;">
      Scroll down to see throttled events
    </div>
  </div>
</template>
```

### Angular

```typescript
import { Component, HostListener } from '@angular/core';
import { useThrottle } from './hooks/data-async/useThrottle/angular';

@Component({
  selector: 'app-scroll-tracker',
  template: `
    <div>
      <p>Scroll Position: {{ scrollPosition }}px</p>
      <div style="height: 200vh; width: 100%;">
        Scroll down to see throttled events
      </div>
    </div>
  `,
})
export class ScrollTrackerComponent {
  scrollPosition = 0;

  private handleScroll = () => {
    const position = window.scrollY;
    this.scrollPosition = position;
    console.log('Scrolled to:', position);
  };

  private throttledScrollHandler = useThrottle(
    this.handleScroll.bind(this),
    200
  );

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.throttledScrollHandler();
  }
}
```

## Browser Support

All modern browsers supporting ES2020+

## Edge Cases Handled

- Proper cleanup of timeouts on component unmount
- Ensures function executes at least once after throttling period
- Handles rapid successive calls correctly
- SSR-safe implementation

## Cleanup Guarantees

- React: useEffect cleanup removes pending timeouts
- Vue: onUnmounted cleanup removes pending timeouts
- Angular: DestroyRef cleanup removes pending timeouts

## Angular Implementation Details

Uses Angular's DestroyRef for proper cleanup when the component is destroyed, preventing memory leaks from pending timeouts. Unlike debouncing, throttling ensures the function executes at regular intervals.
