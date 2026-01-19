# useClipboard

## Explanation
Provides a simple interface to read from and write to the system clipboard. Essential for "Copy to Clipboard" buttons.

## Usage

### React
```tsx
const { copy, copiedText } = useClipboard();
// <button onClick={() => copy('Hello')}>Copy</button>
```

### Angular
```typescript
this.clipboardService.copy('Hello World');
```

### Vue
```vue
<script setup>
const { copy, copiedText } = useClipboard();
</script>
<!-- <button @click="copy('Hello')">Copy</button> -->
```

📋 Copy-paste made easy with #useClipboard

Don't mess with `document.execCommand` anymore. Use the modern Clipboard API wrapped in a hook.

Features:
✅ Async support
✅ Error handling
✅ State tracking (what was copied)

React snippet:
```tsx
const { copy, copiedText } = useClipboard();
// <button onClick={() => copy('Hello!')}>Copy</button>
```

Copy that! 🫡

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useClipboard


#webdev #javascript #react #hooks
