# useNumberInput

## Explanation
Handles numeric inputs with convenience methods for incrementing and decrementing. Ensures type safety (always works with numbers, not strings).

## Usage

### React
```tsx
const quantity = useNumberInput(1);
// <button onClick={quantity.decrement}>-</button>
// <input {...quantity.bind} />
// <button onClick={quantity.increment}>+</button>
```

### Angular
```typescript
qtyControl = new FormControl(1);
// <input type="number" [formControl]="qtyControl">
```

### Vue
```vue
<script setup>
const quantity = useNumberInput(1);
</script>
<!-- <input type="number" v-model.number="quantity.value" /> -->
```

🔢 Count on #useNumberInput

HTML number inputs return strings by default. This hook ensures you always work with real numbers.

React snippet:
```tsx
const { value, increment, decrement } = useNumberInput(0);
```

No more `parseInt(e.target.value)`! 🧮

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useNumberInput


#javascript #forms #react #webdev
