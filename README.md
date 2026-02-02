# @tri-hooks/library

A comprehensive, tree-shakable hooks library for React, Vue, and Angular with identical functionality and TypeScript support. Covers all major browser APIs and common frontend patterns.

## 🚀 Features

- **Tree-shakable**: Import only what you need
- **Framework Agnostic**: Same API across React, Vue, and Angular
- **TypeScript Ready**: Strictly typed with comprehensive type definitions
- **Browser API Coverage**: Implements all major browser APIs
- **Production Ready**: SSR-safe, proper cleanup, edge-case handling
- **Performance Optimized**: Efficient implementations with proper memoization
- **Cross-Platform**: Consistent behavior across all supported frameworks

## 📦 Installation

**One install for everything:**

```bash
npm install @tri-hooks/library
```

There is only one package. After installing, you can **use** hooks in two ways:

| How you use it | What you do |
|----------------|-------------|
| **All at once** | Import many hooks from `@tri-hooks/library` (React) or `@tri-hooks/library/vue` or `@tri-hooks/library/angular` |
| **Single hook (separately)** | Import one hook from its path, e.g. `@tri-hooks/library/hooks/state-ui/useToggle/react` — your bundle stays small (tree-shaking) |

### Use all hooks at once (single import)

Import multiple hooks from the main package or from a framework-specific entry. Best when you use several hooks in the same app.

| Framework | Import from | Example |
|-----------|-------------|---------|
| React | `@tri-hooks/library` or `@tri-hooks/library/react` | `import { useToggle, useClipboard } from '@tri-hooks/library'` |
| Vue | `@tri-hooks/library/vue` | `import { useToggle, useClipboard } from '@tri-hooks/library/vue'` |
| Angular | `@tri-hooks/library/angular` | `import { useToggle, useClipboard } from '@tri-hooks/library/angular'` |

### Use hooks separately (tree-shaking, smaller bundles)

Import only the hook you need from its path. Bundlers will include just that hook.

```ts
// React
import { useToggle } from '@tri-hooks/library/hooks/state-ui/useToggle/react';

// Vue
import { useToggle } from '@tri-hooks/library/hooks/state-ui/useToggle/vue';

// Angular
import { useToggle } from '@tri-hooks/library/hooks/state-ui/useToggle/angular';
```

| Use case | Recommendation |
|----------|-----------------|
| Use many hooks | Import from `@tri-hooks/library` (React) or `@tri-hooks/library/vue` or `@tri-hooks/library/angular` |
| Use one or two hooks, want smallest bundle | Import from the hook path, e.g. `@tri-hooks/library/hooks/state-ui/useToggle/react` |

## 🎯 Categories

### State & UI

- [useToggle](./hooks/state-ui/useToggle/README.md) - Boolean state management
- [useCounter](./hooks/state-ui/useCounter/README.md) - Numeric state management
- [useBoolean](./hooks/state-ui/useBoolean/README.md) - Enhanced boolean state management
- [usePrevious](./hooks/state-ui/usePrevious/README.md) - Previous value tracking
- [useClipboard](./hooks/state-ui/useClipboard/README.md) - Copy to clipboard
- [useHover](./hooks/state-ui/useHover/README.md) - Hover state for elements

### Data & Async

- [useDebounce](./hooks/data-async/useDebounce/README.md) - Function call debouncing
- [useThrottle](./hooks/data-async/useThrottle/README.md) - Function call throttling
- [useFetch](./hooks/data-async/useFetch/README.md) - HTTP request management
- [useAsync](./hooks/data-async/useAsync/README.md) - Promise handling with loading/error states
- [useSWR](./hooks/data-async/useSWR/README.md) - Stale-while-revalidate data fetching strategy
- [useInterval](./hooks/data-async/useInterval/README.md) - Interval with cleanup
- [useTimeout](./hooks/data-async/useTimeout/README.md) - Timeout with cleanup
- [useIdle](./hooks/data-async/useIdle/README.md) - User idle detection
- [useDebouncedValue](./hooks/data-async/useDebouncedValue/README.md) - Debounced value (e.g. search input)

### DOM & Events

- [useIntersectionObserver](./hooks/dom-events/useIntersectionObserver/README.md) - Element visibility detection
- [useResizeObserver](./hooks/dom-events/useResizeObserver/README.md) - Element size monitoring
- [useClickOutside](./hooks/dom-events/useClickOutside/README.md) - Outside click detection
- [useKeyPress](./hooks/dom-events/useKeyPress/README.md) - Keyboard key press handler

### Storage

- [useLocalStorage](./hooks/storage/useLocalStorage/README.md) - Persistent client-side storage

### Device & Connectivity

- [useNetwork](./hooks/device-connectivity/useNetwork/README.md) - Network status monitoring
- [useOnline](./hooks/device-connectivity/useOnline/README.md) - Online/offline status detection
- [useBattery](./hooks/device-connectivity/useBattery/README.md) - Battery status monitoring
- [useGeolocation](./hooks/device-connectivity/useGeolocation/README.md) - Geolocation tracking
- [useMousePosition](./hooks/device-connectivity/useMousePosition/README.md) - Mouse position tracking
- [useWindowSize](./hooks/device-connectivity/useWindowSize/README.md) - Window size monitoring

### Animation

- [useAnimationFrame](./hooks/animation/useAnimationFrame/README.md) - Animation frame management

### Browser APIs

- [usePageVisibility](./hooks/browser-apis/usePageVisibility/README.md) - Page visibility tracking
- [useFullscreen](./hooks/browser-apis/useFullscreen/README.md) - Fullscreen mode management
- [useLockBodyScroll](./hooks/browser-apis/useLockBodyScroll/README.md) - Lock body scroll (modals)

### Media

- [useMediaQuery](./hooks/media/useMediaQuery/README.md) - CSS media query management
- [usePreferredColorScheme](./hooks/media/usePreferredColorScheme/README.md) - prefers-color-scheme (light/dark)

### Notifications

- [useToast](./hooks/notifications/useToast/README.md) - Toast notification management

### Forms

- [useValidation](./hooks/forms/useValidation/README.md) - Form field validation

## 🔧 Usage

### React

**All at once:**

```typescript
import { useToggle, useClipboard } from '@tri-hooks/library';
// or: import { useToggle, useClipboard } from '@tri-hooks/library/react';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const { copy, copied } = useClipboard();
  return (
    <button onClick={toggle}>{value ? 'ON' : 'OFF'}</button>
  );
}
```

**Separately (tree-shaken):**

```typescript
import { useToggle } from '@tri-hooks/library/hooks/state-ui/useToggle/react';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  return <button onClick={toggle}>{value ? 'ON' : 'OFF'}</button>;
}
```

### Vue

**All at once:**

```typescript
import { useToggle, useClipboard } from '@tri-hooks/library/vue';

export default {
  setup() {
    const { value, toggle } = useToggle(false);
    const { copy, copied } = useClipboard();
    return { value, toggle, copy, copied };
  },
};
```

**Separately (tree-shaken):**

```typescript
import { useToggle } from '@tri-hooks/library/hooks/state-ui/useToggle/vue';

export default {
  setup() {
    const { value, toggle } = useToggle(false);
    return { value, toggle };
  },
};
```

### Angular

**All at once:**

```typescript
import { Component } from '@angular/core';
import { useToggle, useClipboard } from '@tri-hooks/library/angular';

@Component({
  selector: 'app-my-component',
  template: `<button (click)="toggle()">{{ value() ? 'ON' : 'OFF' }}</button>`,
})
export class MyComponent {
  private toggleHook = useToggle(false);
  clipboard = useClipboard();

  value = this.toggleHook.value;
  toggle = this.toggleHook.toggle;
}
```

**Separately (tree-shaken):**

```typescript
import { Component } from '@angular/core';
import { useToggle } from '@tri-hooks/library/hooks/state-ui/useToggle/angular';

@Component({
  selector: 'app-my-component',
  template: `<button (click)="toggle()">{{ value() ? 'ON' : 'OFF' }}</button>`,
})
export class MyComponent {
  private toggleHook = useToggle(false);
  value = this.toggleHook.value;
  toggle = this.toggleHook.toggle;
}
```

## 🛠️ Framework-Specific Patterns

### Angular Implementation Notes

- **Signals First**: Angular hooks prioritize signals for reactivity
- **RxJS When Needed**: Uses observables only when continuous streams or cancellation is required
- **Injectable Services**: Shared logic exposed as injectable services
- **Minimal Observable Usage**: Avoiding heavy RxJS unless necessary

### React Implementation Notes

- **Functional Hooks**: Pure functional approach with useCallback/useMemo
- **Proper Effects**: useEffect for side effects, useLayoutEffect when needed
- **Typed Returns**: Comprehensive TypeScript return type definitions

### Vue Implementation Notes

- **Composition API**: Pure composition functions
- **Reactive References**: Using ref/computed/watch as appropriate
- **Lifecycle Management**: Proper cleanup via onUnmounted

## 🧪 Testing

Each hook includes comprehensive tests covering:

- Normal usage scenarios
- Edge cases and error conditions
- Cleanup and resource management
- Cross-framework behavioral consistency

## 📄 License

MIT License - Free to use in commercial and personal projects.

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 🆘 Support

For support, please open an issue in the repository or contact the maintainers.
