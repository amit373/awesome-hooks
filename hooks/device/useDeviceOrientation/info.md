# useDeviceOrientation

## Explanation
Accesses the device's physical orientation (alpha, beta, gamma). Great for games, AR, or interactive UI effects.

## Usage

### React
```tsx
const { alpha, beta, gamma } = useDeviceOrientation();
// style={{ transform: `rotate(${alpha}deg)` }}
```

### Angular
```typescript
this.orientationService.orientation$.subscribe(o => ...);
```

### Vue
```vue
<script setup>
const orientation = useDeviceOrientation();
</script>
<!-- {{ orientation.alpha }} -->
```

🧭 Spin it around with #useDeviceOrientation

Create immersive web experiences by tapping into device sensors.

React snippet:
```tsx
const { beta, gamma } = useDeviceOrientation();
// Parallax effect
const style = { transform: `translate(${gamma}px, ${beta}px)` };
```

Mobile web doesn't have to be static. 📱

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/device/useDeviceOrientation


#webgl #creativecoding #react #frontend
