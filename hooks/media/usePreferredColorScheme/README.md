# usePreferredColorScheme

Read the user's preferred color scheme from the `prefers-color-scheme` media query. Returns `'light'`, `'dark'`, or `null` (SSR/no preference).

## When to Use

- Theme switching (respect system preference)
- Default theme before user choice
- Dark/light mode initialization

## API Reference

### React

```typescript
const scheme = usePreferredColorScheme(): 'light' | 'dark' | null
```

### Vue

```typescript
const scheme = usePreferredColorScheme(): Ref<'light' | 'dark' | null>
```

### Angular

```typescript
const scheme = usePreferredColorScheme(): Signal<'light' | 'dark' | null>
```

**Returns:**

- `'light'`: User prefers light theme
- `'dark'`: User prefers dark theme
- `null`: No preference or SSR

## Usage Examples

### React

```tsx
import { usePreferredColorScheme } from '@tri-hooks/library/hooks/media/usePreferredColorScheme/react';

function ThemeProvider() {
  const scheme = usePreferredColorScheme();
  useEffect(() => {
    if (scheme) document.documentElement.setAttribute('data-theme', scheme);
  }, [scheme]);
  return <App />;
}
```

### Vue

```vue
<script setup>
import { usePreferredColorScheme } from '@tri-hooks/library/hooks/media/usePreferredColorScheme/vue';
import { watch } from 'vue';

const scheme = usePreferredColorScheme();
watch(scheme, (s) => {
  if (s) document.documentElement.setAttribute('data-theme', s);
}, { immediate: true });
</script>
```

### Angular

```typescript
import { usePreferredColorScheme } from '@tri-hooks/library/hooks/media/usePreferredColorScheme/angular';

@Component({ ... })
export class ThemeComponent {
  scheme = usePreferredColorScheme();
  // scheme() => 'light' | 'dark' | null
}
```

## Browser Support

Uses `matchMedia('(prefers-color-scheme: dark)')`. Supported in all modern browsers. SSR-safe (returns null when no window).
