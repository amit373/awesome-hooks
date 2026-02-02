# useTimeout

Run a callback once after a delay with proper cleanup. Cancel by passing `null` or unmounting.

## When to Use

- Delayed actions (e.g. show message then hide)
- Debounce-like one-shot delays
- Redirect or navigation after a delay
- Any single delayed execution

## API Reference

### React

```typescript
useTimeout(callback: () => void, delay: number | null): void
```

### Vue / Angular

```typescript
useTimeout(callback: () => void, delay: () => number | null): void
```

**Parameters:**

- `callback`: Function to run after delay
- `delay`: Delay in ms; `null` or negative to not run (Vue/Angular: getter for reactivity)

## Usage Examples

### React

```tsx
import { useTimeout } from '@tri-hooks/library/hooks/data-async/useTimeout/react';

function Message() {
  const [show, setShow] = useState(true);
  useTimeout(() => setShow(false), 3000);
  return show ? <p>Disappears in 3s</p> : null;
}
```

### Vue

```vue
<script setup>
import { useTimeout } from '@tri-hooks/library/hooks/data-async/useTimeout/vue';
import { ref } from 'vue';

const show = ref(true);
useTimeout(() => (show.value = false), () => 3000);
</script>
```

### Angular

```typescript
import { useTimeout } from '@tri-hooks/library/hooks/data-async/useTimeout/angular';

@Component({ ... })
export class MessageComponent {
  show = signal(true);
  constructor() {
    useTimeout(() => this.show.set(false), () => 3000);
  }
}
```

## Cleanup Guarantees

Timeout is cleared on unmount or when delay changes.
