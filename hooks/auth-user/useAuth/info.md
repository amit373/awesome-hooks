# useAuth

## Explanation
Provides global authentication state (user, login, logout, isAuthenticated). Typically implemented via Context (React), Service (Angular), or a singleton composable (Vue).

## Usage

### React
```tsx
// Wrap app in <AuthProvider>
const { user, login, logout } = useAuth();
```

### Angular
```typescript
constructor(public auth: AuthService) {}
// this.auth.login({ id: 1 })
```

### Vue
```vue
<script setup>
const { user, login } = useAuth();
</script>
```

🔐 Authentication solved with #useAuth

Stop passing user props down 10 levels. Use a hook to access auth state anywhere.

React snippet:
```tsx
const { user, logout } = useAuth();

if (!user) return <Login />;
return <Dashboard user={user} onLogout={logout} />;
```

Secure and simple. 🛡️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/auth-user/useAuth


#auth #security #react #frontend
