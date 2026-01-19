# useAsync

## Explanation
A generic hook to handle the state of any async operation (Promise). It tracks status (idle, pending, success, error), value, and errors. Useful for things that aren't just GET requests.

## Usage

### React
```tsx
const { execute, status, value, error } = useAsync(myApiCall, false);
// <button onClick={execute}>Run</button>
```

### Angular
```typescript
this.asyncService.run(this.http.post(...)).subscribe(state => ...);
```

### Vue
```vue
<script setup>
const { execute, status, value } = useAsync(myApiCall);
</script>
```

🔄 Handle any Promise with #useAsync

Don't write `loading = true` ... `loading = false` for the 100th time.

Use a generic wrapper for all your async needs.

States handled:
✅ Idle
✅ Pending
✅ Success
✅ Error

React snippet:
```tsx
const { status, value } = useAsync(fetchData);
if (status === 'pending') return 'Loading...';
```

Async made synchronous-looking. 🎩

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useAsync


#javascript #typescript #react #promise
