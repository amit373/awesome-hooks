# useConfirm

## Explanation
A promise-based confirmation dialog hook. Allows you to await user input (Yes/No) before proceeding with an action.

## Usage

### React
```tsx
const { confirm, isOpen, message, handleConfirm, handleCancel } = useConfirm();

const deleteItem = async () => {
  if (await confirm('Are you sure?')) {
    // delete
  }
};
// <Dialog open={isOpen} onOk={handleConfirm} onCancel={handleCancel}>{message}</Dialog>
```

### Angular
```typescript
if (await this.confirmService.confirm('Delete?')) { ... }
```

### Vue
```vue
<script setup>
const { confirm, isOpen, handleConfirm } = useConfirm();
const onDelete = async () => {
  if (await confirm('Sure?')) delete();
}
</script>
```

❓ Ask before you act with #useConfirm

Don't delete that database row just yet! Wrap dangerous actions in a promise-based confirmation.

React snippet:
```tsx
const handleDelete = async () => {
  const isConfirmed = await confirm('Delete this item?');
  if (isConfirmed) deleteItem();
};
```

Async/await makes modal logic linear and readable. 📖

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/notifications/useConfirm


#react #ux #frontend #javascript
