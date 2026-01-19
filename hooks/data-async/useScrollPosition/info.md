# useScrollPosition

## Explanation
Tracks the current window scroll coordinates (X and Y). Useful for progress bars, sticky headers, or triggering animations based on scroll depth.

## Usage

### React
```tsx
const { x, y } = useScrollPosition();
// <nav style={{ opacity: y > 100 ? 1 : 0 }}>
```

### Angular
```typescript
this.scrollService.position$.subscribe(pos => ...);
```

### Vue
```vue
<script setup>
const { x, y } = useScrollPosition();
</script>
```

📜 Track user journey with #useScrollPosition

Build dynamic UIs that react to how far the user has read.

Examples:
✅ Reading progress bar
✅ "Back to top" button visibility
✅ Sticky navigation effects

React snippet:
```tsx
const { y } = useScrollPosition();
return <ProgressBar percent={y / docHeight} />;
```

Scroll aware UIs are engaging UIs. 🎢

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useScrollPosition


#webdesign #ux #react #javascript
