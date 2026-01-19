# useScrollableRef

## Explanation
Determines if an element has overflow content and is scrollable. Useful for showing "scroll more" indicators or shadows.

## Usage

### React
```tsx
const { ref, canScroll } = useScrollableRef();
// <div ref={ref} className={canScroll ? 'shadow' : ''}>...</div>
```

### Angular
```typescript
if (this.scrollService.isScrollable(this.box)) { ... }
```

### Vue
```vue
<script setup>
const { elementRef, canScroll } = useScrollableRef();
</script>
<!-- <div ref="elementRef" :class="{ scroll: canScroll }">...</div> -->
```

📜 Scroll hints with #useScrollableRef

Sometimes it's not obvious that a container can scroll. Detect it automatically.

React snippet:
```tsx
const { ref, canScroll } = useScrollableRef();

return (
  <div className="container">
    <div ref={ref} className="content">...</div>
    {canScroll && <div className="fade-overlay" />}
  </div>
);
```

Subtle UI cues make a big difference. 💡

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/dom/useScrollableRef


#ux #ui #css #react
