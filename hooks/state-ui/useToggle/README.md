# useToggle

A simple and efficient hook for managing boolean state with toggle functionality.

## Problem

Managing boolean state (like modal visibility, dark mode, loading states) requires boilerplate code for toggling values and manual state updates.

## When to Use

- Modal/dialog visibility
- Dark/light theme switching
- Loading states
- Accordion panels
- Checkbox-like behaviors

## API Reference

### React

```typescript
const [value, toggle, setValue] = useToggle(initialValue?: boolean)
```

### Vue

```typescript
const { value, toggle, setValue } = useToggle(initialValue?: boolean)
```

### Angular

```typescript
const { value, toggle, setValue } = useToggle(initialValue?: boolean)
```

**Parameters:**

- `initialValue` (boolean, optional): Initial state value (default: `false`)

**Returns:**

- `value`: Current boolean state
- `toggle()`: Function to toggle the boolean value
- `setValue(value: boolean)`: Function to set specific boolean value

## Usage Examples

### React

```tsx
import { useToggle } from './hooks/state-ui/useToggle/react';

function Modal() {
  const [isOpen, toggleOpen, setIsOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>Toggle Modal</button>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <button onClick={() => setIsOpen(false)}>Close</button>

      {isOpen && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={toggleOpen}>Close</button>
        </div>
      )}
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useToggle } from './hooks/state-ui/useToggle/vue';

const { value: isDarkMode, toggle } = useToggle(false);
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <button @click="toggle">Toggle Theme</button>
    <p>Current theme: {{ isDarkMode ? 'Dark' : 'Light' }}</p>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useToggle } from './hooks/state-ui/useToggle/angular';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggle()">Toggle Theme</button>
    <p>Current theme: {{ value() ? 'Dark' : 'Light' }}</p>
  `,
})
export class ThemeToggleComponent {
  private toggleHook = useToggle(false);

  value = this.toggleHook.value;
  toggle = this.toggleHook.toggle;
}
```

## Browser Support

All modern browsers supporting ES2020+

## Edge Cases Handled

- Proper cleanup of event listeners (none in this simple hook)
- SSR-safe implementation
- Type-safe with TypeScript

## Cleanup Guarantees

No cleanup required - pure state management hook.

## Angular Implementation Details

Uses Angular Signals for reactive state management, providing automatic change detection and efficient updates.
