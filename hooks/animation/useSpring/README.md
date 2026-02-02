# useSpring

A powerful spring-physics based animation hook that creates smooth, natural motion with configurable tension and friction parameters. Perfect for UI animations that feel organic and responsive.

## Features

- **Physics-based animation**: Uses spring physics for natural-looking motion
- **Cross-framework support**: Available for React, Vue 3, and Angular
- **Tree-shakable**: Only import what you need
- **SSR-friendly**: Safe to use in server-side rendered applications
- **Configurable**: Adjust tension and friction to fine-tune the animation
- **Multiple value support**: Animate multiple properties simultaneously

## Installation

```bash
npm install your-hooks-library
```

## Usage

### React
```tsx
import { useSpring } from 'your-hooks-library/react';

function MyComponent() {
  const [animatedValues, setTarget] = useSpring({ x: 0, y: 0 }, { 
    tension: 170, 
    friction: 26 
  });

  const handleClick = () => {
    setTarget({ x: 100, y: 50 });
  };

  return (
    <div 
      style={{ 
        transform: `translate(${animatedValues.x}px, ${animatedValues.y}px)` 
      }}
      onClick={handleClick}
    >
      Draggable Element
    </div>
  );
}
```

### Vue 3
```vue
<script setup>
import { useSpring } from 'your-hooks-library/vue';

const [animatedValues, setTarget] = useSpring({ scale: 1 }, { 
  tension: 170, 
  friction: 26 
});

const handleClick = () => {
  setTarget({ scale: 1.5 });
};
</script>

<template>
  <div 
    :style="{ transform: `scale(${animatedValues.scale})` }"
    @click="handleClick"
  >
    Animated Element
  </div>
</template>
```

### Angular
```typescript
import { Component, effect } from '@angular/core';
import { useSpring } from 'your-hooks-library/angular';

@Component({
  template: `
    <div 
      [style.transform]="'scale(' + animatedValues().scale + ')'"
      (click)="handleClick()"
    >
      Animated Element
    </div>
  `
})
export class MyComponent {
  [animatedValues, setTarget] = useSpring({ scale: 1 }, { 
    tension: 170, 
    friction: 26 
  });

  constructor() {
    effect(() => {
      console.log('Animated values:', animatedValues());
    });
  }

  handleClick() {
    setTarget({ scale: 1.5 });
  }
}
```

## API

### Parameters

- `initialValues` (Record<string, number>): Initial values for the animated properties
- `config` (Object, optional): Configuration object with:
  - `tension` (number, default: 170): Spring tension parameter
  - `friction` (number, default: 26): Spring friction parameter  
  - `precision` (number, default: 0.01): Animation precision threshold

### Return Value

Returns a tuple `[animatedValues, setTarget]` where:

- `animatedValues`: Signal/Reactive object containing the current animated values
- `setTarget`: Function to set new target values for the animation

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## License

MIT