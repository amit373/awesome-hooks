# useTransition

## Explanation
Manages the mounting and unmounting of components with enter/exit transition stages. Useful when you need to animate a component before it disappears from the DOM.

## Usage

### React
```tsx
const { shouldMount, stage } = useTransition(isVisible, 300);
// if (shouldMount) <div className={`modal ${stage}`}>...</div>
```

### Angular
```typescript
const transition = this.transitionService.createTransition(false);
// transition.toggle(true);
```

### Vue
```vue
<script setup>
const { shouldMount, stage } = useTransition(isVisible, 300);
</script>
<!-- <div v-if="shouldMount" :class="stage">...</div> -->
```

🎭 Orchestrate UI entrances with #useTransition

Mounting and unmounting components usually kills animations. Not anymore.

React snippet:
```tsx
const { shouldMount, stage } = useTransition(isOpen, 300);

return shouldMount && (
  <div style={{ opacity: stage === 'active' ? 1 : 0 }}>
    Content
  </div>
);
```

Fade in, fade out, unmount. Clean. ✨

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/animation/useTransition


#ui #animation #ux #react
