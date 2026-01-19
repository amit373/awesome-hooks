# useWindowSize

## Explanation
Tracks the browser window's dimensions. Useful for canvas rendering, complex responsive layouts that CSS can't handle, or positioning logic.

## Usage

### React
```tsx
const { width, height } = useWindowSize();
```

### Angular
```typescript
this.windowSizeService.size$.subscribe(({ width, height }) => {
  console.log(width, height);
});
```

### Vue
```vue
<script setup>
const { width, height } = useWindowSize();
</script>
```

📏 Get screen dimensions instantly with #useWindowSize

Need pixel-perfect control over your layout? Stop querying `window.innerWidth` manually.

Use cases:
✅ Canvas sizing
✅ Dynamic positioning
✅ Fallback for container queries

React snippet:
```tsx
const { width, height } = useWindowSize();
```

Size matters! 🖥️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useWindowSize


#frontend #webdev #react #javascript
