# useKeyPress

Run a callback when a specific key is pressed. Supports single key or multiple keys (e.g. Escape, Enter).

## When to Use

- Close modal on Escape
- Submit on Enter
- Keyboard shortcuts
- Accessibility (keyboard navigation)

## API Reference

### React

```typescript
useKeyPress(
  keys: string | string[],
  callback: () => void,
  options?: { target?: EventTarget | null; event?: 'keydown' | 'keyup' }
): void
```

### Vue / Angular

```typescript
useKeyPress(
  keys: () => string | string[],
  callback: () => void,
  options?: { target?: EventTarget | null; event?: 'keydown' | 'keyup' }
): void
```

**Parameters:**

- `keys`: Key(s) to listen for (e.g. 'Escape', 'Enter')
- `callback`: Function to run when key is pressed
- `options.target`: Event target (default: window)
- `options.event`: 'keydown' (default) or 'keyup'

## Usage Examples

### React

```tsx
import { useKeyPress } from '@tri-hooks/library/hooks/dom-events/useKeyPress/react';

function Modal({ onClose }: { onClose: () => void }) {
  useKeyPress('Escape', onClose);
  return <div className="modal">...</div>;
}
```

### Vue

```vue
<script setup>
import { useKeyPress } from '@tri-hooks/library/hooks/dom-events/useKeyPress/vue';

const emit = defineEmits(['close']);
useKeyPress(() => 'Escape', () => emit('close'));
</script>
```

### Angular

```typescript
import { useKeyPress } from '@tri-hooks/library/hooks/dom-events/useKeyPress/angular';

@Component({ ... })
export class ModalComponent {
  constructor() {
    useKeyPress(() => 'Escape', () => this.close());
  }
}
```

## Cleanup Guarantees

Listeners are removed on unmount.
