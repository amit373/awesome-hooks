# useClipboard

Copy text to the clipboard with success/error state. Wraps the Clipboard API with a simple `copy(text)` function and `copied` state.

## When to Use

- Copy-to-clipboard buttons
- Share or “Copy link” actions
- Code snippets or tokens
- Any UI that needs to copy text

## API Reference

### React / Vue / Angular

```typescript
const { copied, copy, error } = useClipboard();
// copy(text: string) => Promise<boolean>
```

**Returns:**

- `copied`: Boolean (or ref/signal) — true briefly after a successful copy
- `copy(text)`: Async function — copies text, returns true on success
- `error`: Error or null (or ref/signal) — set if Clipboard API fails

## Usage Examples

### React

```tsx
import { useClipboard } from '@tri-hooks/library/hooks/state-ui/useClipboard/react';

function CopyButton({ text }: { text: string }) {
  const { copied, copy, error } = useClipboard();
  return (
    <button onClick={() => copy(text)}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
```

### Vue

```vue
<script setup>
import { useClipboard } from '@tri-hooks/library/hooks/state-ui/useClipboard/vue';

const { copied, copy, error } = useClipboard();
</script>

<template>
  <button @click="copy('Hello')">{{ copied ? 'Copied!' : 'Copy' }}</button>
</template>
```

### Angular

```typescript
import { useClipboard } from '@tri-hooks/library/hooks/state-ui/useClipboard/angular';

@Component({ ... })
export class CopyButtonComponent {
  clipboard = useClipboard();
  // clipboard.copied(), clipboard.copy(text), clipboard.error()
}
```

## Browser Support

Requires [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) (HTTPS or localhost). Graceful fallback: `error` is set, `copy` returns false.

## Edge Cases

- `copied` resets to false after 2 seconds
- Timeout is cleared on unmount/destroy
- SSR-safe: checks for `navigator.clipboard` before use
