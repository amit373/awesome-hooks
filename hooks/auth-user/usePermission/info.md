# usePermission

## Explanation
Checks if the current authenticated user has a specific permission or role. Essential for Role-Based Access Control (RBAC).

## Usage

### React
```tsx
const canDelete = usePermission('delete_users');
// <button disabled={!canDelete}>Delete</button>
```

### Angular
```typescript
this.permService.hasPermission('admin').subscribe(isAdmin => ...);
```

### Vue
```vue
<script setup>
const canEdit = usePermission('edit_post');
</script>
<!-- <button v-if="canEdit">Edit</button> -->
```

🚫 Access denied? Check with #usePermission

Implement RBAC (Role-Based Access Control) easily in your components.

React snippet:
```tsx
const isAdmin = usePermission('admin_access');
if (!isAdmin) return <AccessDenied />;
```

Fine-grained control for your app. 👮‍♀️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/auth-user/usePermission


#rbac #security #react #hooks
