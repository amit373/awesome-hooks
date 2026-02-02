# useCounter

A flexible counter hook for managing numeric state with increment, decrement, reset, and direct value setting capabilities.

## Problem

Managing numeric counters requires repetitive boilerplate code for common operations like incrementing, decrementing, resetting, and setting specific values.

## When to Use

- Shopping cart item quantities
- Pagination controls
- Score counters
- Progress indicators
- Form field counters
- Rating systems

## API Reference

### React

```typescript
const [value, { increment, decrement, reset, setValue }] = useCounter(initialValue?: number, step?: number)
```

### Vue

```typescript
const { value, increment, decrement, reset, setValue } = useCounter(initialValue?: number, step?: number)
```

### Angular

```typescript
const { value, increment, decrement, reset, setValue } = useCounter(initialValue?: number, step?: number)
```

**Parameters:**

- `initialValue` (number, optional): Starting value (default: `0`)
- `step` (number, optional): Increment/decrement step size (default: `1`)

**Returns:**

- `value`: Current numeric state
- `increment()`: Increase value by step amount
- `decrement()`: Decrease value by step amount
- `reset()`: Reset to initial value
- `setValue(value: number)`: Set specific numeric value

## Usage Examples

### React

```tsx
import { useCounter } from './hooks/state-ui/useCounter/react';

function ProductQuantity() {
  const [quantity, { increment, decrement, reset }] = useCounter(1, 1);

  return (
    <div className="quantity-selector">
      <button onClick={decrement} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useCounter } from './hooks/state-ui/useCounter/vue';

const { value: score, increment, reset } = useCounter(0, 10);
</script>

<template>
  <div class="score-board">
    <h2>Score: {{ score }}</h2>
    <button @click="increment">Add Points</button>
    <button @click="reset">Reset Score</button>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useCounter } from './hooks/state-ui/useCounter/angular';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination">
      <button (click)="decrement()" [disabled]="value() <= 1">Previous</button>
      <span>Page {{ value() }} of {{ totalPages }}</span>
      <button (click)="increment()" [disabled]="value() >= totalPages">
        Next
      </button>
    </div>
  `,
})
export class PaginationComponent {
  private counter = useCounter(1, 1);
  totalPages = 10;

  value = this.counter.value;
  increment = this.counter.increment;
  decrement = this.counter.decrement;
}
```

## Browser Support

All modern browsers supporting ES2020+

## Edge Cases Handled

- Prevents negative values in decrement (user responsibility)
- Proper memoization of callback functions
- SSR-safe implementation
- Type-safe with TypeScript

## Cleanup Guarantees

No cleanup required - pure state management hook.

## Angular Implementation Details

Uses Angular Signals for optimal reactivity and change detection. The `update()` method provides atomic state updates for better performance.
