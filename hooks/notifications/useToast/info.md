# useToast

## Explanation
Manages a queue of temporary notification messages (toasts). Handles auto-dismissal timers and unique IDs.

## Usage

### React
```tsx
const { toasts, addToast } = useToast();
// addToast('Saved!', 'success');
// {toasts.map(t => <div key={t.id}>{t.message}</div>)}
```

### Angular
```typescript
this.toastService.show('Saved!', 'success');
// <div *ngFor="let t of toastService.toasts$ | async">{{t.message}}</div>
```

### Vue
```vue
<script setup>
const { toasts, addToast } = useToast();
</script>
<!-- <div v-for="t in toasts" :key="t.id">{{ t.message }}</div> -->
```

🍞 Fresh notifications with #useToast

User feedback is critical. Manage ephemeral success/error messages with a simple hook.

React snippet:
```tsx
const { addToast } = useToast();
const handleSave = async () => {
  await save();
  addToast('Saved successfully!', 'success');
};
```

Better UX in 3 lines of code. 🚀

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/notifications/useToast


#ux #ui #react #notifications
