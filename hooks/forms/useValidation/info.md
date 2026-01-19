# useValidation

## Explanation
Runs a list of validation functions against a value whenever it changes. Returns the first error message found (if any) and a boolean validity flag.

## Usage

### React
```tsx
const isEmail = (val) => val.includes('@') ? null : 'Invalid email';
const { error, isValid } = useValidation(email, [isEmail]);
```

### Angular
```typescript
const emailValidator = this.validationService.createValidator(isEmail);
// new FormControl('', [emailValidator])
```

### Vue
```vue
<script setup>
const { error } = useValidation(emailRef, [isEmail]);
</script>
```

🛡️ Guard your data with #useValidation

Don't let bad data slip through. Validate it reactively.

React snippet:
```tsx
const { error } = useValidation(password, [
  val => val.length < 8 ? "Too short" : null,
  val => !/[0-9]/.test(val) ? "Needs number" : null
]);
```

Keep it clean, keep it safe. 🔒

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useValidation


#security #forms #react #validation
