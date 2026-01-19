# usePrevious

## Explanation
Tracks the previous value of a state variable. Essential for comparing changes, triggering animations based on direction, or implementing undo/redo functionality.

## Usage

### React
```tsx
const prevCount = usePrevious(count);
useEffect(() => {
  if (count > prevCount) console.log('Count increased');
}, [count]);
```

### Angular
```typescript
// Manual update required in this service implementation
this.previousService.update(newValue);
const prev = this.previousService.previous;
```

### Vue
```vue
<script setup>
const count = ref(0);
const prevCount = usePrevious(count);
</script>
```

🔙 Need the previous state value? #usePrevious

Sometimes you need to know where you came from to know where you're going.

Useful for:
✅ Comparing old vs new values
✅ Animation direction (slide left/right)
✅ Auditing changes

React snippet:
```tsx
const prevCount = usePrevious(count);
// if (count > prevCount) console.log("Increased!");
```

Simple but powerful! 💪

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/usePrevious


#reactjs #javascript #coding #frontend
