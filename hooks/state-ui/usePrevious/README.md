# usePrevious

Store and return the previous value of a state or prop. Useful for comparing before/after, animations, or transition effects.

## When to Use

- Comparing previous vs current value
- Detecting value changes for side effects
- Animation or transition triggers
- Debugging state changes

## API Reference

### React

```typescript
const previousValue = usePrevious<T>(value: T): T | undefined
```

### Vue

```typescript
const previous = usePrevious<T>(value: T): Ref<T | undefined>
// Read as previous.value
```

### Angular

```typescript
const previous = usePrevious<T>(value: Signal<T>): Signal<T | undefined>
// Read as previous()
```

**Parameters:**

- `value`: Current value to track (React/Vue: any; Angular: Signal)

**Returns:**

- Previous value, or `undefined` on first render

## Usage Examples

### React

```tsx
import { usePrevious } from '@tri-hooks/library/hooks/state-ui/usePrevious/react';

function Counter({ count }: { count: number }) {
  const prevCount = usePrevious(count);
  return (
    <p>
      Now: {count}, before: {prevCount ?? '—'}
    </p>
  );
}
```

### Vue

```vue
<script setup>
import { usePrevious } from '@tri-hooks/library/hooks/state-ui/usePrevious/vue';
import { ref } from 'vue';

const count = ref(0);
const prevCount = usePrevious(count);
</script>

<template>
  <p>Now: {{ count }}, before: {{ prevCount ?? '—' }}</p>
</template>
```

### Angular

```typescript
import { usePrevious } from '@tri-hooks/library/hooks/state-ui/usePrevious/angular';
import { signal } from '@angular/core';

@Component({ ... })
export class CounterComponent {
  count = signal(0);
  prevCount = usePrevious(this.count);
}
```

## Browser Support

All modern browsers. No special APIs.

## Cleanup Guarantees

No cleanup required (React uses ref; Vue/Angular use reactive references).
