# useNetworkSpeed

## Explanation
Estimates the user's network connection speed and type (e.g., '4g', '3g'). Helps in adapting content quality based on bandwidth.

## Usage

### React
```tsx
const { downlink, effectiveType } = useNetworkSpeed();
// {effectiveType === '4g' ? <HDVideo /> : <SDVideo />}
```

### Angular
```typescript
this.speedService.speed$.subscribe(speed => ...);
```

### Vue
```vue
<script setup>
const { effectiveType } = useNetworkSpeed();
</script>
<!-- <div v-if="effectiveType === 'slow-2g'">Loading low-res images...</div> -->
```

🚀 Need for speed? #useNetworkSpeed

Don't serve 4K video to a user on 2G. Adapt your content to the network conditions.

React snippet:
```tsx
const { effectiveType } = useNetworkSpeed();
const videoSrc = effectiveType === '4g' ? 'high.mp4' : 'low.mp4';
```

Smart loading = happy users. ⚡

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/device/useNetworkSpeed


#performance #ux #react #frontend
