# useOnlineStatus

## Explanation
Tracks the browser's online/offline status. Useful for disabling features or showing warnings when the network is lost.

## Usage

### React
```tsx
const isOnline = useOnlineStatus();
// {isOnline ? 'Connected' : 'Offline'}
```

### Angular
```typescript
this.onlineService.isOnline$.subscribe(online => ...);
```

### Vue
```vue
<script setup>
const isOnline = useOnlineStatus();
</script>
<!-- <div v-if="!isOnline">No Connection</div> -->
```

📶 Stay connected with #useOnlineStatus

Don't let users fail silently. Detect network changes instantly.

React snippet:
```tsx
const isOnline = useOnlineStatus();

return (
  <div style={{ filter: isOnline ? 'none' : 'grayscale(1)' }}>
    {isOnline ? '🟢 Online' : '🔴 Offline'}
  </div>
);
```

Robust apps handle the real world. 🌍

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/device/useOnlineStatus


#pwa #react #frontend #webdev
