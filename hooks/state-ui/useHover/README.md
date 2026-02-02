# useHover

Track whether the user is hovering over an element. Returns a ref to attach to the DOM node and a boolean (or ref/signal) for hover state.

## When to Use

- Tooltips (show on hover)
- Dropdowns and menus
- Highlight or focus styles
- Any hover-dependent UI

## API Reference

### React

```typescript
const [ref, isHovered] = useHover<T extends HTMLElement>();
// ref is a callback ref — use ref={ref} on the element; isHovered is boolean
```

### Vue

```typescript
const { ref, isHovered } = useHover<T extends HTMLElement>();
// Bind ref in template; isHovered is Ref<boolean>
```

### Angular

```typescript
const { isHovered, setElement } = useHover<T>(elementRef?);
// Call setElement(el) when element is available, or pass ElementRef
```

**Returns:**

- `ref` (React/Vue): Ref to attach to the element
- `isHovered`: Boolean / Ref / Signal — true when pointer is over the element
- Angular: `setElement(el)` to attach to an element

## Usage Examples

### React

```tsx
import { useHover } from '@tri-hooks/library/hooks/state-ui/useHover/react';

function Card() {
  const [ref, isHovered] = useHover<HTMLDivElement>();
  return (
    <div ref={ref} className={isHovered ? 'hovered' : ''}>
      Hover me
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useHover } from '@tri-hooks/library/hooks/state-ui/useHover/vue';

const { ref: hoverRef, isHovered } = useHover();
</script>

<template>
  <div ref="hoverRef" :class="{ hovered: isHovered }">Hover me</div>
</template>
```

### Angular

```typescript
import { useHover } from '@tri-hooks/library/hooks/state-ui/useHover/angular';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({ ... })
export class CardComponent implements AfterViewInit {
  @ViewChild('box') boxRef!: ElementRef<HTMLDivElement>;
  hover = useHover();

  ngAfterViewInit() {
    this.hover.setElement(this.boxRef.nativeElement);
  }
}
```

## Browser Support

All browsers (mouseenter/mouseleave).

## Cleanup Guarantees

Event listeners are removed on unmount/destroy.
