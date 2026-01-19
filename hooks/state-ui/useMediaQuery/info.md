# useMediaQuery

## Explanation
Subscribes to a media query string (like `(min-width: 768px)`) and returns a boolean indicating if it matches. Essential for building responsive components in JavaScript.

## Usage

### React
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
if (isMobile) return <MobileMenu />;
```

### Angular
```typescript
this.mediaQueryService.match('(max-width: 768px)').subscribe(isMobile => {
  this.isMobile = isMobile;
});
```

### Vue
```vue
<script setup>
const isMobile = useMediaQuery('(max-width: 768px)');
</script>
```

📱 Responsive Logic in JS with #useMediaQuery

CSS media queries are great, but sometimes you need to render different components based on screen size.

Use cases:
✅ Mobile vs Desktop navigation
✅ Conditional rendering of heavy components
✅ Adaptive layouts

React snippet:
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
// return isMobile ? <Hamburger /> : <Tabs />;
```

Responsive JS made simple. 📐

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useMediaQuery


#responsive #webdesign #react #angular #vue
