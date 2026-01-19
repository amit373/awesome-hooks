# useIntersectionObserver

## Explanation
A low-level hook to track when an element enters or leaves the viewport. Useful for lazy loading images, animations, or analytics.

## Usage

### React
```tsx
const [ref, entry] = useIntersectionObserver({ threshold: 0.5 });
// entry?.isIntersecting
```

### Angular
```typescript
this.intersectionService.observe(this.el, { threshold: 0.5 })
  .subscribe(entry => console.log(entry.isIntersecting));
```

### Vue
```vue
<script setup>
const { elementRef, entry } = useIntersectionObserver();
</script>
<!-- <div ref="elementRef"> -->
```

👀 Watch your elements with #useIntersectionObserver

Stop using scroll listeners! They are heavy and slow. Use the browser's native observer.

Great for:
✅ Lazy loading images
✅ Triggering animations on scroll
✅ Tracking ad impressions

React snippet:
```tsx
const [ref, entry] = useIntersectionObserver();
// <div style={{ opacity: entry?.isIntersecting ? 1 : 0 }} ref={ref} />
```

Performant and clean. 🚀

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useIntersectionObserver


#webperf #javascript #react #frontend
