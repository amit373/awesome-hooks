# useElementFadeIn

## Explanation
Trigger a fade-in animation when an element scrolls into view. Adds a professional touch to landing pages and lists.

## Usage

### React
```tsx
const { ref, style } = useElementFadeIn();
// <div ref={ref} style={style}>Hello</div>
```

### Angular
```typescript
@ViewChild('box') box!: ElementRef;
ngAfterViewInit() { this.fadeInService.observe(this.box); }
```

### Vue
```vue
<script setup>
const { elementRef, isVisible } = useElementFadeIn();
</script>
<!-- <div ref="elementRef" :class="{ 'fade-in': isVisible }">...</div> -->
```

✨ Make an entrance with #useElementFadeIn

Static pages are boring. Animate elements as they scroll into view to guide user attention.

React snippet:
```tsx
const { ref, style } = useElementFadeIn(500); // 500ms
return <div ref={ref} style={style}>I appear magically!</div>;
```

Simple intersection observer logic, big impact. 🚀

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/animation/useElementFadeIn


#webdesign #animation #frontend #react
