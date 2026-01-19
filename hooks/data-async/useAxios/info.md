# useAxios

## Explanation
A wrapper for Axios that simplifies data fetching with React hooks or Vue composables. It handles cancellation automatically when the component unmounts.

## Usage

### React
```tsx
const { data, loading, error } = useAxios('/api/user');
```

### Angular
```typescript
this.axiosService.get('/api/user').subscribe(data => ...);
```

### Vue
```vue
<script setup>
const { data, error, loading } = useAxios('/api/user');
</script>
```

🚀 Supercharge your API calls with #useAxios

Prefer Axios over Fetch? Wrap it in a hook for automatic cancellation and state management.

Features:
✅ Auto-cancellation on unmount
✅ Loading/Error states
✅ Axios config support

React snippet:
```tsx
const { data, loading } = useAxios('/api/products');
```

Clean up those side effects! 🧹

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useAxios


#axios #react #vue #javascript #api
