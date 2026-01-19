# useCounter

## Explanation
A state management hook that handles numeric values with built-in increment, decrement, set, and reset functionality. It supports optional min/max constraints, making it perfect for pagination, shopping cart quantities, or step-based forms.

## Usage

### React
```tsx
const { count, increment, decrement, reset } = useCounter(0, { min: 0, max: 10 });
```

### Angular
```typescript
constructor(public counter: CounterService) {
  this.counter.init(0, { min: 0, max: 10 });
}
// In template: {{ counter.count$ | async }}
// <button (click)="counter.increment()">+</button>
```

### Vue
```vue
<script setup>
const { count, increment, decrement } = useCounter(0, { min: 0, max: 10 });
</script>
```

🚀 Simplify state logic with #useCounter!

Tired of rewriting "count + 1" logic? The useCounter hook standardizes numeric state management across your app. Perfect for:
✅ Shopping cart quantities
✅ Pagination controls
✅ Stepper forms

Here's how easy it is in React:
```tsx
const { count, increment, decrement } = useCounter(0, { min: 0, max: 10 });
```

Stop reinventing the wheel! 🛠️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useCounter


#webdev #reactjs #vuejs #angular #frontend #codingtips
