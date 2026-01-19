# useHover

## Explanation
Detects if an element is being hovered over. Useful for showing tooltips, dropdowns, or triggering animations without using CSS `:hover` (e.g. for logic-based changes).

## Usage

### React
```tsx
const [hoverRef, isHovered] = useHover<HTMLDivElement>();
// <div ref={hoverRef}>{isHovered ? 'Hovered' : 'Normal'}</div>
```

### Angular
```typescript
@ViewChild('box') box: ElementRef;
// ngAfterViewInit:
this.hoverService.observe(this.box).subscribe(isHovered => ...);
```

### Vue
```vue
<script setup>
const boxRef = ref(null);
const isHovered = useHover(boxRef);
</script>
<!-- <div ref="boxRef">...</div> -->
```

🖱️ Detect hover state in JS with #useHover

CSS :hover is great, but sometimes you need JS logic when hovering.

Use cases:
✅ Tooltips
✅ Analytics tracking
✅ Preloading data on hover

React snippet:
```tsx
const [ref, isHovered] = useHover();
// <div ref={ref}>{isHovered ? 'Hi!' : 'Bye'}</div>
```

Interaction ready! 👆

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useHover


#ux #frontend #react #javascript
