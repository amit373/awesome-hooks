# useInterval

Run a callback at a fixed interval with proper cleanup. Pause by passing `null` or `0` as delay.

## When to Use

- Polling (e.g. refetch every 5s)
- Timers and countdowns
- Animation ticks
- Any repeated action on a schedule

## API Reference

### React

```typescript
useInterval(callback: () => void, delay: number | null): void
```

### Vue / Angular

```typescript
useInterval(callback: () => void, delay: () => number | null): void
```

**Parameters:**

- `callback`: Function to run on each tick
- `delay`: Interval in ms; `null` or `0` to pause (Vue/Angular: getter for reactivity)

## Usage Examples

### React

```tsx
import { useInterval } from '@tri-hooks/library/hooks/data-async/useInterval/react';

function Poller() {
  const [count, setCount] = useState(0);
  useInterval(() => setCount((c) => c + 1), 1000);
  return <p>{count}</p>;
}
```

### Vue

```vue
<script setup>
import { useInterval } from '@tri-hooks/library/hooks/data-async/useInterval/vue';
import { ref } from 'vue';

const count = ref(0);
const delay = ref(1000);
useInterval(() => count.value++, () => delay.value);
</script>
```

### Angular

```typescript
import { useInterval } from '@tri-hooks/library/hooks/data-async/useInterval/angular';

@Component({ ... })
export class PollerComponent {
  count = signal(0);
  delay = signal(1000);
  constructor() {
    useInterval(() => this.count.update(c => c + 1), () => this.delay());
  }
}
```

## Cleanup Guarantees

Interval is cleared on unmount or when delay becomes null/0.
