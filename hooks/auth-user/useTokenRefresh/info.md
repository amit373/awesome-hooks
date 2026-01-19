# useTokenRefresh

## Explanation
Automatically refreshes authentication tokens in the background at a specified interval. Keeps the user logged in without manual intervention.

## Usage

### React
```tsx
useTokenRefresh(api.refreshToken, 15 * 60 * 1000);
```

### Angular
```typescript
this.tokenService.start(this.api.refresh, 900000);
```

### Vue
```vue
<script setup>
useTokenRefresh(api.refreshToken);
</script>
```

🔄 Keep sessions alive with #useTokenRefresh

Don't let your users get logged out unexpectedly. Refresh tokens silently in the background.

React snippet:
```tsx
useTokenRefresh(async () => {
  const newToken = await api.refresh();
  setToken(newToken);
}, 15 * 60 * 1000); // 15 mins
```

Seamless security. 🕵️‍♂️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/auth-user/useTokenRefresh


#jwt #auth #security #react #frontend
