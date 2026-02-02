# useIntersectionObserver

A hook for efficiently observing changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

## Problem

Detecting when elements enter or exit the viewport requires complex scroll event listeners and calculations. Intersection Observer provides a more efficient solution.

## When to Use

- Lazy loading images/content
- Infinite scrolling
- Triggering animations when elements become visible
- Tracking element visibility for analytics
- Performance optimization (only render content when visible)

## API Reference

### React

```typescript
const { isIntersecting, entry, observe, unobserve } = useIntersectionObserver(options?)
```

### Vue

```typescript
const { isIntersecting, entry, observe, unobserve } = useIntersectionObserver(options?)
```

### Angular

```typescript
const { isIntersecting, entry, observe, unobserve } = useIntersectionObserver(options?)
```

**Parameters:**

- `options` (optional):
  - `threshold` (number | number[], optional): Ratio of intersection area to total bounding box area (default: `0`)
  - `root` (Element | null, optional): Root element that the target element's visibility should be checked against (default: `null`)
  - `rootMargin` (string, optional): Margin around the root element (default: `'0%'`)

**Returns:**

- `isIntersecting` (boolean): Whether the target element intersects with the root
- `entry` (IntersectionObserverEntry | undefined): Latest intersection entry object
- `observe(element: Element | null)`: Function to start observing an element
- `unobserve()`: Function to stop observing the current element

## Usage Examples

### React

```tsx
import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from './hooks/dom-events/useIntersectionObserver/react';

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { isIntersecting, observe, unobserve } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (imgRef.current) {
      observe(imgRef.current);
    }

    return () => {
      unobserve();
    };
  }, [observe, unobserve]);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return (
    <div>
      {!isVisible && <div>Loading placeholder...</div>}
      {isVisible && <img ref={imgRef} src={src} alt={alt} />}
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useIntersectionObserver } from './hooks/dom-events/useIntersectionObserver/vue';

const props = defineProps(['src', 'alt']);
const imgRef = ref(null);
const isVisible = ref(false);

const { isIntersecting, observe, unobserve } = useIntersectionObserver({
  threshold: 0.1,
});

onMounted(() => {
  if (imgRef.value) {
    observe(imgRef.value);
  }
});

onUnmounted(() => {
  unobserve();
});

watch(
  () => isIntersecting.value,
  newVal => {
    if (newVal) {
      isVisible.value = true;
    }
  }
);
</script>

<template>
  <div>
    <div v-if="!isVisible">Loading placeholder...</div>
    <img v-if="isVisible" ref="imgRef" :src="props.src" :alt="props.alt" />
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
import { useIntersectionObserver } from './hooks/dom-events/useIntersectionObserver/angular';

@Component({
  selector: 'app-lazy-image',
  template: `
    <div>
      <div *ngIf="!isVisible">Loading placeholder...</div>
      <img *ngIf="isVisible" #imageRef [src]="src" [alt]="alt" />
    </div>
  `,
})
export class LazyImageComponent implements OnInit, OnDestroy {
  @ViewChild('imageRef', { static: false })
  imageRef!: ElementRef<HTMLImageElement>;
  isVisible = false;

  private observer = useIntersectionObserver({
    threshold: 0.1,
  });

  constructor() {}

  ngOnInit() {
    if (this.imageRef) {
      this.observer.observe(this.imageRef.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer.unobserve();
  }

  ngAfterViewInit() {
    // Watch for intersection changes
    const checkIntersection = () => {
      if (this.observer.isIntersecting) {
        this.isVisible = true;
      } else {
        requestAnimationFrame(checkIntersection);
      }
    };

    checkIntersection();
  }
}
```

## Browser Support

Modern browsers supporting IntersectionObserver API (Chrome 51+, Firefox 55+, Safari 12.1+, Edge 79+)

## Edge Cases Handled

- Graceful degradation when IntersectionObserver is not supported
- Proper cleanup of observers on component unmount
- Prevents multiple observers on the same element
- Handles dynamic element changes

## Cleanup Guarantees

- React: useEffect cleanup disconnects observer
- Vue: onUnmounted cleanup disconnects observer
- Angular: DestroyRef cleanup disconnects observer

## Angular Implementation Details

Uses getter functions for reactive properties since Angular doesn't have refs like Vue. The destroyRef.onDestroy ensures proper cleanup when the component is destroyed.
