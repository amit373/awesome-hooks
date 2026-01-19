# useAlert

## Explanation
Simple global or local alert state management. Good for showing prominent warnings or errors that require user dismissal.

## Usage

### React
```tsx
const { isVisible, message, showAlert, hideAlert } = useAlert();
// <Alert isOpen={isVisible} onClose={hideAlert}>{message}</Alert>
```

### Angular
```typescript
this.alertService.show('Critical Error', 'error');
```

### Vue
```vue
<script setup>
const { isVisible, message, showAlert } = useAlert();
</script>
<!-- <div v-if="isVisible">{{ message }}</div> -->
```

🚨 Alert! #useAlert is here

Don't let errors go unnoticed. Trigger dismissible alerts from anywhere in your app.

React snippet:
```tsx
const { showAlert } = useAlert();

try {
  await apiCall();
} catch (e) {
  showAlert('Something went wrong', 'error');
}
```

Clear communication prevents confusion. 🛑

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/notifications/useAlert


#frontend #react #errors #ux
