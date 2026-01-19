# useSessionStorage

## Explanation
Similar to `useLocalStorage`, but data is cleared when the page session ends (tab is closed). Ideal for temporary data like search filters or multi-step form progress that shouldn't persist long-term.

## Usage

### React
```tsx
const [step, setStep] = useSessionStorage('signup-step', 1);
```

### Angular
```typescript
constructor(private sessionStorage: SessionStorageService<number>) {
  this.sessionStorage.init('signup-step', 1);
}
```

### Vue
```vue
<script setup>
const step = useSessionStorage('signup-step', 1);
</script>
```

⏳ Temporary state made easy with #useSessionStorage!

Need data to stick around during a reload but vanish when the tab closes? `useSessionStorage` is the answer.

Perfect for:
✅ Multi-step form data
✅ One-time authentication tokens
✅ Temporary UI settings

React snippet:
```tsx
const [filters, setFilters] = useSessionStorage('search-filters', {});
```

Keep your global storage clean! 🧹

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useSessionStorage


#webdev #javascript #react #vue #frontend
