# useInput

## Explanation
A micro-hook for managing a single input field. Returns the value and an `onChange` handler spreadable directly onto inputs.

## Usage

### React
```tsx
const nameInput = useInput('');
// <input {...nameInput.bind} />
```

### Angular
```typescript
nameControl = new FormControl('');
// <input [formControl]="nameControl">
```

### Vue
```vue
<script setup>
const name = useInput('');
</script>
<!-- <input v-model="name.value" /> -->
```

⌨️ The smallest hook ever: #useInput

Stop writing `e => setValue(e.target.value)` manually.

Features:
✅ Instant binding
✅ Built-in reset
✅ Clean JSX

React snippet:
```tsx
const email = useInput('');
return <input {...email.bind} />;
```

Less boilerplate, more coding. 👨‍💻

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useInput


#react #frontend #javascript #forms
