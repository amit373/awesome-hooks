# useResizeObserver

## Explanation
Monitors the dimensions of a DOM element using the ResizeObserver API. More performant and accurate than listening to window resize events.

## Usage

### React
```tsx
const { ref, size } = useResizeObserver();
// <div ref={ref}>Width: {size?.width}</div>
```

### Angular
```typescript
this.resizeService.observe(this.el).subscribe(rect => ...);
```

### Vue
```vue
<script setup>
const { elementRef, size } = useResizeObserver();
</script>
<!-- <div ref="elementRef">{{ size?.width }}</div> -->
```

📏 Measure up with #useResizeObserver

Need to know when a specific `div` changes size, not just the window?

React snippet:
```tsx
const { ref, size } = useResizeObserver();

return (
  <div ref={ref}>
    Current width: {size?.width}px
  </div>
);
```

Responsive components done right. 📐

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/dom/useResizeObserver


#css #layout #react #frontend
