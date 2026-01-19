# useFocus

## Explanation
Manages focus state for an element and provides a method to programmatically set focus. Essential for accessibility and custom input components.

## Usage

### React
```tsx
const { ref, isFocused, focus, bind } = useFocus();
// <input ref={ref} {...bind} style={{ border: isFocused ? 'blue' : 'gray' }} />
// <button onClick={focus}>Focus Input</button>
```

### Angular
```typescript
@ViewChild('input') input!: ElementRef;
focus() { this.focusService.focus(this.input); }
```

### Vue
```vue
<script setup>
const { elementRef, isFocused, focus, onFocus, onBlur } = useFocus();
</script>
<!-- <input ref="elementRef" @focus="onFocus" @blur="onBlur" /> -->
```

🎯 Stay focused with #useFocus

Managing focus states manually is a pain. Simplify it.

React snippet:
```tsx
const { ref, isFocused, bind } = useFocus();

return (
  <div className={`input-wrapper ${isFocused ? 'active' : ''}`}>
    <input ref={ref} {...bind} />
  </div>
);
```

Accessibility wins. ♿

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/dom/useFocus


#a11y #react #frontend #webdev
