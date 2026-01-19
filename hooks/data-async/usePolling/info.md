# usePolling

## Explanation
Periodically executes a function or API call at a specified interval. Essential for keeping data up-to-date in real-time dashboards without WebSockets.

## Usage

### React
```tsx
const data = usePolling(() => fetch('/api/status').then(r => r.json()), 5000);
```

### Angular
```typescript
this.pollingService.poll(this.http.get('/api/status'), 5000).subscribe(data => ...);
```

### Vue
```vue
<script setup>
const data = usePolling(async () => await (await fetch('/api')).json(), 5000);
</script>
```

🔄 Keep data fresh with #usePolling

Sometimes WebSockets are overkill. Polling is simple, effective, and robust.

Features:
✅ Auto-start/stop
✅ Interval control
✅ Initial fetch

React snippet:
```tsx
usePolling(fetchNewMessages, 3000); // Checks every 3s
```

Real-time(ish) updates made easy. ⏱️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/usePolling


#react #angular #vue #webdev #frontend
