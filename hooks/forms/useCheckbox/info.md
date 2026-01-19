# useCheckbox

## Explanation
Handles boolean state for checkbox inputs. Simplifies the `e.target.checked` access pattern.

## Usage

### React
```tsx
const terms = useCheckbox(false);
// <input type="checkbox" {...terms.bind} />
```

### Angular
```typescript
termsControl = new FormControl(false);
// <input type="checkbox" [formControl]="termsControl">
```

### Vue
```vue
<script setup>
const terms = useCheckbox(false);
</script>
<!-- <input type="checkbox" v-model="terms.checked" /> -->
```

☑️ Checkmate with #useCheckbox

Boolean inputs work differently than text inputs (`checked` vs `value`). This hook standardizes it.

React snippet:
```tsx
const { checked, onChange } = useCheckbox(false);
// <input type="checkbox" checked={checked} onChange={onChange} />
```

Simple and effective.

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useCheckbox


#react #frontend #forms #hooks
