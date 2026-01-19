# useQueryParams

## Explanation
Parses URL query parameters into an easy-to-use object. Essential for handling search filters, campaigns, or sharing state via URL.

## Usage

### React
```tsx
const { search, page } = useQueryParams();
```

### Angular
```typescript
this.route.queryParams.subscribe(params => console.log(params));
```

### Vue
```vue
<script setup>
const query = useQueryParams();
// query.id
</script>
```

🔗 Parse URLs instantly with #useQueryParams

Stop manually parsing `window.location.search`. Get a clean object of your URL parameters.

Use cases:
✅ Search filters
✅ Pagination state
✅ Referral codes

React snippet:
```tsx
const { utm_source, ref } = useQueryParams();
```

Keep your state in the URL! 🌐

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/data-async/useQueryParams


#url #react #hooks #frontend
