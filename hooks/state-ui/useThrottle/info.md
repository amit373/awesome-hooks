# useThrottle

## Explanation
Ensures a function or value update only happens at most once every specified number of milliseconds. Great for scroll events, resize handlers, or button spam prevention.

## Usage

### React
```tsx
const throttledScroll = useThrottle(scrollPosition, 100);
```

### Angular
```typescript
this.throttleService.throttle(scroll$, 100).subscribe(val => ...);
```

### Vue
```vue
<script setup>
const throttledScroll = useThrottle(scrollPosition, 100);
</script>
```

🏎️ Control the flow with #useThrottle!

Unlike debounce, throttle ensures updates happen at a steady rate. Perfect for continuous events.

Use cases:
✅ Scroll listeners (infinite scroll)
✅ Window resize calculations
✅ Button click prevention (spamming)

React snippet:
```tsx
const throttledScroll = useThrottle(scrollPosition, 100);
// Updates max once every 100ms
```

Smooth interactions, always. ✨

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useThrottle


#javascript #performance #frontend #reactjs #vue
