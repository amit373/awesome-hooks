# useSelect

## Explanation
Specialized hook for `<select>` elements. Similar to `useInput` but typed correctly for select change events.

## Usage

### React
```tsx
const role = useSelect('user');
// <select {...role.bind}><option value="user">User</option></select>
```

### Angular
```typescript
roleControl = new FormControl('user');
// <select [formControl]="roleControl">...
```

### Vue
```vue
<script setup>
const role = useSelect('user');
</script>
<!-- <select v-model="role.value"> -->
```

🔽 Dropdowns made simple with #useSelect

Manage select boxes without the hassle.

React snippet:
```tsx
const fruit = useSelect('apple');
return <select {...fruit.bind}>...</select>;
```

Select success. ✅

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useSelect


#react #forms #html #frontend
