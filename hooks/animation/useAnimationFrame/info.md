# useAnimationFrame

## Explanation
Hooks into the browser's `requestAnimationFrame` loop. Perfect for high-performance animations, game loops, or smooth canvas rendering.

## Usage

### React
```tsx
useAnimationFrame((deltaTime) => {
  // Move object based on deltaTime
  setX(prev => prev + speed * deltaTime);
});
```

### Angular
```typescript
this.animService.frame$.subscribe(deltaTime => ...);
this.animService.start();
```

### Vue
```vue
<script setup>
useAnimationFrame((deltaTime) => {
  // Animation logic
});
</script>
```

🎬 Silky smooth animations with #useAnimationFrame

Forget `setInterval`. Use the browser's native frame loop for 60fps buttery smoothness.

React snippet:
```tsx
useAnimationFrame((deltaTime) => {
  setRotation(r => r + (deltaTime * 0.01));
});
```

Game dev ready. 🎮

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/animation/useAnimationFrame


#animation #gamedev #react #webgl
