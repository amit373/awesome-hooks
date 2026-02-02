# useResizeObserver

A hook for efficiently observing changes to the size of DOM elements using the Resize Observer API.

## Problem

Detecting when elements change size traditionally required complex scroll/mutation observers or polling. Resize Observer provides an efficient solution with native browser support.

## When to Use

- Responsive layouts that depend on element dimensions
- Canvas or SVG sizing
- Adaptive UI components
- Image galleries or masonry layouts
- Dynamic charts or visualizations

## API Reference

### React

```typescript
const { width, height, entry, observe, unobserve } = useResizeObserver(options?)
```

### Vue

```typescript
const { width, height, entry, observe, unobserve } = useResizeObserver(options?)
```

### Angular

```typescript
const { width, height, entry, observe, unobserve } = useResizeObserver(options?)
```

**Parameters:**

- `options` (optional):
  - `box` ('content-box' | 'border-box' | 'device-pixel-content-box', optional): Which box to observe (default: `'content-box'`)

**Returns:**

- `width` (number): Current width of the observed element
- `height` (number): Current height of the observed element
- `entry` (ResizeObserverEntry | undefined): Latest resize entry object
- `observe(element: Element | null)`: Function to start observing an element
- `unobserve()`: Function to stop observing the current element

## Usage Examples

### React

```tsx
import { useRef, useEffect } from 'react';
import { useResizeObserver } from './hooks/dom-events/useResizeObserver/react';

function ResponsiveContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width, height, observe, unobserve } = useResizeObserver({
    box: 'border-box',
  });

  useEffect(() => {
    if (containerRef.current) {
      observe(containerRef.current);
    }

    return () => {
      unobserve();
    };
  }, [observe, unobserve]);

  return (
    <div
      ref={containerRef}
      style={{ border: '1px solid black', padding: '20px' }}
    >
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <p>Resize this container to see changes!</p>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useResizeObserver } from './hooks/dom-events/useResizeObserver/vue';

const containerRef = ref(null);

const { width, height, observe, unobserve } = useResizeObserver({
  box: 'border-box',
});

onMounted(() => {
  if (containerRef.value) {
    observe(containerRef.value);
  }
});

onUnmounted(() => {
  unobserve();
});
</script>

<template>
  <div ref="containerRef" style="border: 1px solid black; padding: 20px;">
    <p>Width: {{ width }}px</p>
    <p>Height: {{ height }}px</p>
    <p>Resize this container to see changes!</p>
  </div>
</template>
```

### Angular

```typescript
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { useResizeObserver } from './hooks/dom-events/useResizeObserver/angular';

@Component({
  selector: 'app-responsive-container',
  template: `
    <div #containerRef style="border: 1px solid black; padding: 20px;">
      <p>Width: {{ width }}px</p>
      <p>Height: {{ height }}px</p>
      <p>Resize this container to see changes!</p>
    </div>
  `,
})
export class ResponsiveContainerComponent implements OnInit, OnDestroy {
  @ViewChild('containerRef', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  private observer = useResizeObserver({
    box: 'border-box',
  });

  constructor() {}

  ngOnInit() {
    if (this.containerRef) {
      this.observer.observe(this.containerRef.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer.unobserve();
  }

  get width(): number {
    return this.observer.width;
  }

  get height(): number {
    return this.observer.height;
  }
}
```

## Browser Support

Modern browsers supporting ResizeObserver API (Chrome 64+, Firefox 69+, Safari 14.1+, Edge 79+). Includes fallback for unsupported browsers.

## Edge Cases Handled

- Graceful degradation when ResizeObserver is not supported
- Proper cleanup of observers on component unmount
- Prevents multiple observers on the same element
- Handles dynamic element changes
- Cross-browser compatibility for different box model measurements

## Cleanup Guarantees

- React: useEffect cleanup disconnects observer
- Vue: onUnmounted cleanup disconnects observer
- Angular: DestroyRef cleanup disconnects observer

## Angular Implementation Details

Uses getter functions for reactive properties since Angular doesn't have refs like Vue. The destroyRef.onDestroy ensures proper cleanup when the component is destroyed.
