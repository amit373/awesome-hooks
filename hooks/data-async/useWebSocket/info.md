# useWebSocket

## Explanation
Manages a WebSocket connection, handling open, close, and message events. It simplifies real-time communication by providing reactive state for the latest message and connection status.

## Usage

### React
```tsx
const { message, send } = useWebSocket('wss://echo.websocket.org');
```

### Angular
```typescript
const socket$ = this.wsService.connect('wss://echo.websocket.org');
socket$.subscribe(msg => console.log(msg));
```

### Vue
```vue
<script setup>
const { message, send } = useWebSocket('wss://echo.websocket.org');
</script>
```

🔌 Real-time apps made simple with #useWebSocket

Connecting to WebSockets manually involves a lot of boilerplate (open, close, error handling). Hooks make it clean.

Features:
✅ Auto-connect/disconnect
✅ Reactive message state
✅ Send helper

React snippet:
```tsx
const { message, isConnected } = useWebSocket('wss://api.com');
```

Stay connected! ⚡

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useWebSocket


#websockets #realtime #react #javascript
