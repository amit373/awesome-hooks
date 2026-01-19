# useIdle

## Explanation
Detects if the user is inactive (idle) for a specified amount of time. Useful for auto-logout, pausing expensive background tasks, or showing "Are you still there?" modals.

## Usage

### React
```tsx
const isIdle = useIdle(5000); // 5 seconds
// if (isIdle) return <LogoutWarning />
```

### Angular
```typescript
this.idleService.idle$(5000).subscribe(isIdle => ...);
```

### Vue
```vue
<script setup>
const isIdle = useIdle(5000);
</script>
```

💤 Detect user inactivity with #useIdle

Security best practice: Auto-logout users if they leave their desk.
Performance best practice: Stop polling if the user isn't looking.

How it works:
1. Listens for mouse/keyboard events
2. Resets a timer on activity
3. Triggers when timer expires

React snippet:
```tsx
const isIdle = useIdle(60000); // 1 min
// if (isIdle) logout();
```

Keep your app secure and efficient. 🔒

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useIdle


#security #frontend #react #webdev
