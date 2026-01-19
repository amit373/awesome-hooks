# useDarkMode

## Explanation
Manages dark mode state, automatically detecting system preference and applying a class (e.g., `dark`) to the body or html tag. It usually persists the preference to local storage.

## Usage

### React
```tsx
const [isDark, setIsDark] = useDarkMode();
// <button onClick={() => setIsDark(!isDark)}>Toggle</button>
```

### Angular
```typescript
constructor(public darkMode: DarkModeService) {}
// <button (click)="darkMode.toggle()">Toggle</button>
// <div [class.dark]="darkMode.darkMode$ | async">...</div>
```

### Vue
```vue
<script setup>
const { isDark, toggle } = useDarkMode();
</script>
<!-- <button @click="toggle">Toggle</button> -->
```

🌙 Dark Mode in 3 lines of code! #useDarkMode

Don't let your users burn their eyes at night. Implement dark mode effortlessly.

Features:
✅ Detects system preference
✅ Persists to LocalStorage
✅ Toggles CSS class on body

React snippet:
```tsx
const [isDark, setIsDark] = useDarkMode();
// <button onClick={() => setIsDark(!isDark)}>Toggle</button>
```

Join the dark side! 🍪

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useDarkMode


#css #react #webdesign #uiux #frontend
