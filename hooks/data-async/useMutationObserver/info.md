# useMutationObserver

## Explanation
Watches for changes to the DOM tree (attributes, child list, subtree). Useful for reacting to changes in 3rd-party components or content editable areas.

## Usage

### React
```tsx
const [ref] = useMutationObserver((mutations) => {
  console.log('DOM Changed!');
});
// <div ref={ref}>...</div>
```

### Angular
```typescript
this.mutationService.observe(this.el).subscribe(mutations => ...);
```

### Vue
```vue
<script setup>
const el = useMutationObserver((mutations) => console.log(mutations));
</script>
<!-- <div ref="el">...</div> -->
```

🕵️‍♂️ Spy on the DOM with #useMutationObserver

Sometimes you need to know when an attribute changes or a node is added, especially with third-party libraries.

React snippet:
```tsx
useMutationObserver(targetRef, (mutations) => {
  console.log("Something changed!");
});
```

DOM awareness unlocked. 🔓

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useMutationObserver


#dom #javascript #frontend #webdev
