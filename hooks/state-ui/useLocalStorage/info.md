# useLocalStorage

## Explanation
Syncs state to `localStorage` so that data persists across page reloads. It handles serialization/deserialization of JSON data automatically and keeps the state in sync with the storage.

## Usage

### React
```tsx
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### Angular
```typescript
constructor(private localStorage: LocalStorageService<string>) {
  this.localStorage.init('theme', 'light');
}
// this.localStorage.value$.subscribe(...)
// this.localStorage.setValue('dark')
```

### Vue
```vue
<script setup>
const theme = useLocalStorage('theme', 'light');
// theme.value = 'dark';
</script>
```

💾 Persist state like a pro with #useLocalStorage!

Why lose data on refresh? Keep your user's preferences, theme settings, or form drafts safe.

Features:
✅ Auto JSON parsing/stringifying
✅ Error handling (e.g. storage full)
✅ SSR safe (with checks)

React snippet:
```tsx
const [name, setName] = useLocalStorage('amit373', 'Guest');
```

Your users will thank you! 🙌

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useLocalStorage


#webdev #frontend #react #javascript #localstorage
