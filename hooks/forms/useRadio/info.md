# useRadio

## Explanation
Manages a group of radio buttons. Ensures they all share the same `name` attribute and update a single state value.

## Usage

### React
```tsx
const gender = useRadio('gender', 'female');
// <input type="radio" value="male" checked={gender.value === 'male'} onChange={gender.onChange} />
// <input type="radio" value="female" checked={gender.value === 'female'} onChange={gender.onChange} />
```

### Angular
```typescript
genderControl = new FormControl('female');
// <input type="radio" value="male" [formControl]="genderControl">
```

### Vue
```vue
<script setup>
const gender = useRadio('female');
</script>
<!-- <input type="radio" value="male" v-model="gender.value" /> -->
```

📻 Tune into #useRadio

Managing radio groups can be verbose. Simplify it by centralizing the state.

React snippet:
```tsx
const { value, onChange } = useRadio('size', 'medium');
// <input type="radio" value="small" checked={value === 'small'} onChange={onChange} />
```

Clear signals only. 📡

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useRadio


#forms #react #ux #frontend
