# useSnackbar

## Explanation
Similar to toasts, but typically single-instance and positioned at the bottom. Useful for "Undo" actions or simple confirmations.

## Usage

### React
```tsx
const { isOpen, message, openSnackbar } = useSnackbar();
// <Snackbar open={isOpen} message={message} />
```

### Angular
```typescript
this.snackbarService.open('Item deleted');
```

### Vue
```vue
<script setup>
const { isOpen, message, openSnackbar } = useSnackbar();
</script>
<!-- <div v-if="isOpen" class="snackbar">{{ message }}</div> -->
```

🍫 Snack-sized notifications with #useSnackbar

Not every alert needs to stop the user. Use snackbars for non-intrusive updates.

React snippet:
```tsx
const { openSnackbar } = useSnackbar();
// ...
openSnackbar('Profile updated');
```

Subtle, effective, and auto-dismissing. 👌

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/notifications/useSnackbar


#materialdesign #ui #react #frontend
