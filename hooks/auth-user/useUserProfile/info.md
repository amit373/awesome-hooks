# useUserProfile

## Explanation
A convenience hook to access the current user's profile data. Often a subset or alias of `useAuth().user`, but typed specifically for profile display.

## Usage

### React
```tsx
const profile = useUserProfile<User>();
// <div>{profile?.name}</div>
```

### Angular
```typescript
this.profileService.profile$.subscribe(p => ...);
```

### Vue
```vue
<script setup>
const profile = useUserProfile();
</script>
<!-- {{ profile?.name }} -->
```

👤 Meet #useUserProfile

Sometimes you just need the user's name and avatar, not the full auth context.

React snippet:
```tsx
const { name, avatar } = useUserProfile();
return <Avatar src={avatar} name={name} />;
```

Keep your components focused. 🎯

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/auth-user/useUserProfile


#react #components #user #frontend
