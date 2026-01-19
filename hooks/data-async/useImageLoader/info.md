# useImageLoader

## Explanation
Preloads images to ensure they are fully downloaded before displaying them. Prevents layout shifts and "pop-in" effects.

## Usage

### React
```tsx
const { loaded } = useImageLoader('https://example.com/large.jpg');
// return loaded ? <img src="..." /> : <Skeleton />;
```

### Angular
```typescript
this.imageService.load('url').subscribe(() => this.showImage = true);
```

### Vue
```vue
<script setup>
const { loaded } = useImageLoader('url');
</script>
```

🖼️ No more layout shifts with #useImageLoader

Don't let images jump around as they load. Preload them logically.

Use case:
✅ Hero images
✅ Profile avatars
✅ Gallery transitions

React snippet:
```tsx
const { loaded } = useImageLoader(src);
return loaded ? <img src={src} /> : <Spinner />;
```

Smooth as butter. 🧈

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useImageLoader


#ux #webperf #react #frontend
