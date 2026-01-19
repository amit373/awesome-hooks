# useForm

## Explanation
Manages form state (values, errors, submission) with a simple API. Reduces the boilerplate of setting up controlled inputs for every field.

## Usage

### React
```tsx
const { values, handleChange, handleSubmit } = useForm({ name: '' }, submitFn);
// <input name="name" value={values.name} onChange={handleChange} />
```

### Angular
```typescript
form = this.fb.group({ name: [''] });
// <form [formGroup]="form">
```

### Vue
```vue
<script setup>
const { values, handleSubmit } = useForm({ name: '' });
</script>
<!-- <input v-model="values.name" /> -->
```

📝 Painless form handling with #useForm

Forms are the hardest part of frontend dev... until now.

Features:
✅ Two-way binding (conceptually)
✅ Auto-event handling
✅ Easy reset

React snippet:
```tsx
const { values, handleChange } = useForm({ email: '' });
// <input name="email" value={values.email} onChange={handleChange} />
```

Fill it out, submit it, done. ✅

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useForm


#react #forms #frontend #javascript
