# useDebounce

## Explanation
Delays updating a value until a specified time has passed since the last change. Critical for search inputs to prevent API calls on every keystroke.

## Usage

### React
```tsx
const [text, setText] = useState('');
const debouncedText = useDebounce(text, 500);
```

### Angular
```typescript
this.debounceService.debounce(input$, 500).subscribe(val => ...);
```

### Vue
```vue
<script setup>
const text = ref('');
const debouncedText = useDebounce(text, 500);
</script>
```

⏳ Stop spamming APIs with #useDebounce!

Typing "React" shouldn't fire 5 requests (R, Re, Rea...). Use debounce to wait until the user stops typing.

Impact:
✅ Reduces API load
✅ Improves UI performance
✅ Better user experience

React snippet:
```tsx
const debouncedSearch = useDebounce(searchTerm, 500);
// Only updates 500ms after typing stops
```

Performance matters! 🚀

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useDebounce


#webperf #javascript #react #frontend #api
