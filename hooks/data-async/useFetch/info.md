# useFetch

## Explanation
A wrapper around the native Fetch API that handles loading states, errors, and data parsing. It often includes cleanup logic (aborting requests) to prevent memory leaks.

## Usage

### React
```tsx
const { data, loading, error } = useFetch<User>('/api/user');

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
return <div>{data?.name}</div>;
```

### Angular
```typescript
@Component({ ... })
export class UserComponent {
  data$ = this.fetchService.get<User>('/api/user');
  constructor(private fetchService: FetchService) {}
}
```

### Vue
```vue
<script setup>
const { data, error, loading } = useFetch('/api/user');
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
```

📡 Data fetching simplified with #useFetch

Stop rewriting `try/catch/finally` blocks in every component. Centralize your data fetching logic.

Features:
✅ Loading & Error states
✅ Request cancellation
✅ Type safety

React snippet:
```tsx
const { data, loading, error } = useFetch('/api/user');
if (loading) return <Spinner />;
```

Fetch smarter, not harder. 🧠

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useFetch


#api #react #javascript #webdev
