# useDebouncedValue

Debounce a value (e.g. search input). The returned value updates only after the source has been stable for the given delay.

## When to Use

- Search input (debounce before API call)
- Form fields that trigger side effects
- Any value that should “settle” before being used
- Complements useDebounce (which debounces a function)

## API Reference

### React

```typescript
const debouncedValue = useDebouncedValue<T>(value: T, delay?: number): T
```

### Vue

```typescript
const debouncedValue = useDebouncedValue<T>(value: Ref<T> | (() => T), delay?: number): Ref<T>
```

### Angular

```typescript
const debouncedValue = useDebouncedValue<T>(value: Signal<T> | (() => T), delay?: number): Signal<T>
```

**Parameters:**

- `value`: Current value to debounce
- `delay`: Delay in ms (default: 300)

**Returns:**

- Debounced value (updates after `delay` ms of no changes)

## Usage Examples

### React

```tsx
import { useDebouncedValue } from '@tri-hooks/library/hooks/data-async/useDebouncedValue/react';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### Vue

```vue
<script setup>
import { useDebouncedValue } from '@tri-hooks/library/hooks/data-async/useDebouncedValue/vue';
import { ref, watch } from 'vue';

const query = ref('');
const debouncedQuery = useDebouncedValue(query, 300);
watch(debouncedQuery, (q) => { if (q) fetchResults(q); });
</script>
```

### Angular

```typescript
import { useDebouncedValue } from '@tri-hooks/library/hooks/data-async/useDebouncedValue/angular';

@Component({ ... })
export class SearchComponent {
  query = signal('');
  debouncedQuery = useDebouncedValue(this.query, 300);
}
```

## Cleanup Guarantees

Pending timeout is cleared on unmount and when value/delay changes.
