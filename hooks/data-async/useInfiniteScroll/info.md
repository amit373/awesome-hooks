# useInfiniteScroll

## Explanation
Automatically triggers a callback when the user scrolls to the bottom of a container or page. Uses the Intersection Observer API for high performance.

## Usage

### React
```tsx
const [ref, isFetching, setIsFetching] = useInfiniteScroll(loadMore);
// <div ref={ref}>Loading...</div>
// Call setIsFetching(false) when data loads
```

### Angular
```typescript
@ViewChild('anchor') anchor: ElementRef;
this.scrollService.observe(this.anchor);
this.scrollService.scrolled$.subscribe(() => this.loadMore());
```

### Vue
```vue
<script setup>
const loadMoreRef = useInfiniteScroll(loadMoreData);
</script>
<!-- <div ref="loadMoreRef"></div> -->
```

📜 Endless content with #useInfiniteScroll

Pagination is so 2010. Infinite scroll is the standard for feeds.

How it works:
1. Observe a "sentinel" element at the bottom
2. Trigger fetch when visible
3. Append data

React snippet:
```tsx
const [ref] = useInfiniteScroll(fetchNextPage);
// <div ref={ref}>Loading...</div>
```

Keep 'em scrolling! 📱

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useInfiniteScroll


#ux #frontend #react #webperf
