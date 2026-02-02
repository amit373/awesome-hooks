# useIdle

Detect when the user has been idle for a given timeout. Useful for auto-logout, analytics, or pausing work.

## When to Use

- Auto-logout or session timeout
- Pausing animations or polling when user is away
- Analytics (time on page / idle)
- Dimming UI after inactivity

## API Reference

### React

```typescript
const [isIdle, reset] = useIdle(timeout?: number, options?: UseIdleOptions): [boolean, () => void]
```

### Vue / Angular

```typescript
const { isIdle, reset } = useIdle(timeout?: number, options?: UseIdleOptions)
```

**Parameters:**

- `timeout`: Idle timeout in ms (default: 60000)
- `options.events`: Events that reset the timer (default: mousemove, keydown, scroll, touchstart)

**Returns:**

- `isIdle`: true when user has been idle for `timeout` ms
- `reset()`: Reset the idle timer

## Usage Examples

### React

```tsx
import { useIdle } from '@tri-hooks/library/hooks/data-async/useIdle/react';

function App() {
  const [isIdle, reset] = useIdle(30000);
  return (
    <div>
      {isIdle ? <p>You've been idle 30s</p> : <p>Active</p>}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useIdle } from '@tri-hooks/library/hooks/data-async/useIdle/vue';

const { isIdle, reset } = useIdle(30000);
</script>

<template>
  <p>{{ isIdle ? "Idle" : "Active" }}</p>
  <button @click="reset">Reset</button>
</template>
```

### Angular

```typescript
import { useIdle } from '@tri-hooks/library/hooks/data-async/useIdle/angular';

@Component({ ... })
export class AppComponent {
  idle = useIdle(30000);
  // idle.isIdle(), idle.reset()
}
```

## Browser Support

Uses standard DOM events. SSR-safe (checks for `window`).
