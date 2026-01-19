# useGeoLocation

## Explanation
Real-time geolocation tracking. Wraps `navigator.geolocation.watchPosition` to provide live GPS coordinates.

## Usage

### React
```tsx
const { location, error } = useGeoLocation();
// {location?.latitude}, {location?.longitude}
```

### Angular
```typescript
this.geoService.watchPosition().subscribe(coords => ...);
```

### Vue
```vue
<script setup>
const { location } = useGeoLocation();
</script>
<!-- {{ location?.latitude }} -->
```

📍 Where in the world? #useGeoLocation

Add location-aware features to your app in seconds.

React snippet:
```tsx
const { location } = useGeoLocation();

if (!location) return <Spinner />;
return <Map center={[location.latitude, location.longitude]} />;
```

Perfect for delivery apps, maps, and local guides. 🗺️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/device/useGeoLocation


#geolocation #maps #react #frontend
