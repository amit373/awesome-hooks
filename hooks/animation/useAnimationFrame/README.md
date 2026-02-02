# useAnimationFrame

A hook for managing animation frames with real-time FPS tracking and animation control capabilities.

## Problem

Creating smooth animations requires proper synchronization with the browser's refresh rate using requestAnimationFrame. Managing frame counts, calculating FPS, and controlling animation loops involves complex state management and cleanup.

## When to Use

- Game development
- Smooth UI animations
- Canvas animations
- Real-time graphics rendering
- Performance monitoring
- Frame-based animations

## API Reference

### React

```typescript
const { frame, fps, start, stop, reset } = useAnimationFrame();
```

### Vue

```typescript
const { frame, fps, start, stop, reset } = useAnimationFrame();
```

### Angular

```typescript
const { frame, fps, start, stop, reset } = useAnimationFrame();
```

**Returns:**

- `frame` (number): Current frame count since animation started
- `fps` (number): Current frames per second (updated every second)
- `start()`: Function to start/resume the animation
- `stop()`: Function to pause/stop the animation
- `reset()`: Function to reset frame count and FPS to zero

## Usage Examples

### React

```tsx
import { useEffect } from 'react';
import { useAnimationFrame } from './hooks/animation/useAnimationFrame/react';

function AnimatedCircle() {
  const { frame, fps, stop } = useAnimationFrame();

  // Stop animation after 100 frames
  useEffect(() => {
    if (frame >= 100) {
      stop();
    }
  }, [frame, stop]);

  // Calculate animation values based on frame count
  const rotation = (frame % 360) * 2; // Rotate 2 degrees per frame
  const scale = 1 + Math.sin(frame * 0.1) * 0.5; // Scale between 0.5 and 1.5

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transition: 'transform 0.1s linear',
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        margin: '50px auto',
      }}
    >
      <p>Frame: {frame}</p>
      <p>FPS: {fps}</p>
    </div>
  );
}

function GameLoop() {
  const { frame, fps } = useAnimationFrame();

  return (
    <div>
      <h1>Game Loop</h1>
      <p>Frame: {frame}</p>
      <p>FPS: {fps}</p>
      <canvas width="800" height="600" style={{ border: '1px solid black' }} />
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { watch } from 'vue';
import { useAnimationFrame } from './hooks/animation/useAnimationFrame/vue';

const { frame, fps, stop } = useAnimationFrame();

// Stop animation after 100 frames
watch(frame, newFrame => {
  if (newFrame >= 100) {
    stop();
  }
});

// Calculate animation values based on frame count
const rotation = (frame.value % 360) * 2; // Rotate 2 degrees per frame
const scale = 1 + Math.sin(frame.value * 0.1) * 0.5; // Scale between 0.5 and 1.5
</script>

<template>
  <div
    :style="{
      transform: `rotate(${rotation}deg) scale(${scale})`,
      transition: 'transform 0.1s linear',
      width: '100px',
      height: '100px',
      backgroundColor: 'blue',
      borderRadius: '50%',
      margin: '50px auto',
    }"
  >
    <p>Frame: {{ frame }}</p>
    <p>FPS: {{ fps }}</p>
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { useAnimationFrame } from './hooks/animation/useAnimationFrame/angular';

@Component({
  selector: 'app-animated-circle',
  template: `
    <div
      [style.transform]="'rotate(' + rotation + 'deg) scale(' + scale + ')'"
      [style.transition]="'transform 0.1s linear'"
      style="
        width: 100px;
        height: 100px;
        background-color: blue;
        border-radius: 50%;
        margin: 50px auto;
      "
    >
      <p>Frame: {{ frame }}</p>
      <p>FPS: {{ fps }}</p>
    </div>
  `,
})
export class AnimatedCircleComponent {
  private animationHook = useAnimationFrame();

  get frame() {
    return this.animationHook.frame;
  }

  get fps() {
    return this.animationHook.fps;
  }

  start = this.animationHook.start;
  stop = this.animationHook.stop;
  reset = this.animationHook.reset;

  get rotation() {
    return (this.frame % 360) * 2; // Rotate 2 degrees per frame
  }

  get scale() {
    return 1 + Math.sin(this.frame * 0.1) * 0.5; // Scale between 0.5 and 1.5
  }
}
```

## Browser Support

Modern browsers supporting requestAnimationFrame API (all modern browsers)

## Edge Cases Handled

- Proper cleanup of animation frames on component unmount
- FPS calculation with time-based averaging
- Animation loop control (start, stop, reset)
- Memory leak prevention with cancelAnimationFrame
- SSR-safe implementation (returns 0 initially on server)

## Cleanup Guarantees

- React: useEffect cleanup cancels animation frame
- Vue: onUnmounted cleanup cancels animation frame
- Angular: Manual cleanup through stop method

## Angular Implementation Details

Uses Angular Signals for reactive state management. The animation loop starts automatically when the function is called and continues until manually stopped. The hook returns getter functions for reactive properties.
