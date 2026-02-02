# useFetch

A comprehensive hook for handling fetch requests with loading states, error handling, request cancellation, and automatic refetching capabilities.

## Problem

Making HTTP requests in components requires manual handling of loading states, error states, request cancellation, and proper cleanup. This hook encapsulates all the complexity of fetch operations.

## When to Use

- API data fetching
- Loading states for remote data
- Request cancellation
- Automatic refetching on window focus
- Error handling for network requests

## API Reference

### React

```typescript
const { data, loading, error, refetch, abort } = useFetch(url, options?)
```

### Vue

```typescript
const { data, loading, error, refetch, abort } = useFetch(url, options?)
```

### Angular

```typescript
const { data, loading, error, refetch, abort } = useFetch(url, options?)
```

**Parameters:**

- `url` (string): The URL to fetch
- `options` (optional):
  - `manual` (boolean, optional): Whether to skip initial fetch (default: `false`)
  - `initialData` (any, optional): Initial data to use before fetch completes
  - `refetchOnWindowFocus` (boolean, optional): Whether to refetch when window gains focus (default: `false`)
  - Other standard `RequestInit` options (headers, method, body, etc.)

**Returns:**

- `data` (T | null): Response data or initial data
- `loading` (boolean): Whether a request is in progress
- `error` (Error | null): Error if the request failed
- `refetch()`: Function to manually trigger another request
- `abort()`: Function to cancel the current request

## Usage Examples

### React

```tsx
import { useFetch } from './hooks/data-async/useFetch/react';

function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch<User>(`https://api.example.com/users/${userId}`, {
    refetchOnWindowFocus: true,
    headers: {
      Authorization: 'Bearer token123',
    },
  });

  if (loading) return <div>Loading user profile...</div>;
  if (error)
    return (
      <div>
        Error: {error.message} <button onClick={refetch}>Retry</button>
      </div>
    );
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { useFetch } from './hooks/data-async/useFetch/vue';

const props = defineProps(['userId']);

const {
  data: user,
  loading,
  error,
  refetch,
} = useFetch(`https://api.example.com/users/${props.userId}`, {
  refetchOnWindowFocus: true,
  headers: {
    Authorization: 'Bearer token123',
  },
});
</script>

<template>
  <div>
    <div v-if="loading">Loading user profile...</div>
    <div v-else-if="error">
      Error: {{ error.message }}
      <button @click="refetch">Retry</button>
    </div>
    <div v-else-if="!user">No user found</div>
    <div v-else>
      <h1>{{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <button @click="refetch">Refresh</button>
    </div>
  </div>
</template>
```

### Angular

```typescript
import { Component, Input } from '@angular/core';
import { useFetch } from './hooks/data-async/useFetch/angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <div>
      <div *ngIf="loading">Loading user profile...</div>
      <div *ngIf="error">
        Error: {{ error.message }}
        <button (click)="(refetch)">Retry</button>
      </div>
      <div *ngIf="!user && !loading && !error">No user found</div>
      <div *ngIf="user && !loading && !error">
        <h1>{{ user.name }}</h1>
        <p>Email: {{ user.email }}</p>
        <button (click)="(refetch)">Refresh</button>
      </div>
    </div>
  `,
})
export class UserProfileComponent {
  @Input() userId!: string;

  private fetchHook = useFetch<User>(
    `https://api.example.com/users/${this.userId}`,
    {
      refetchOnWindowFocus: true,
      headers: {
        Authorization: 'Bearer token123',
      },
    }
  );

  get user() {
    return this.fetchHook.data;
  }

  get loading() {
    return this.fetchHook.loading;
  }

  get error() {
    return this.fetchHook.error;
  }

  refetch = this.fetchHook.refetch;
}
```

## Browser Support

Modern browsers supporting fetch API and AbortController (Chrome 66+, Firefox 57+, Safari 12+, Edge 79+)

## Edge Cases Handled

- Request cancellation with AbortController
- Memory leak prevention with proper cleanup
- Error handling for network failures
- Loading state management
- Automatic refetching on window focus
- SSR-safe implementation (manual mode recommended for SSR)

## Cleanup Guarantees

- React: useEffect cleanup aborts pending requests
- Vue: onUnmounted cleanup aborts pending requests
- Angular: Manual cleanup should be handled by consumer

## Angular Implementation Details

Uses Angular Signals for reactive state management. The hook sets up requests immediately unless manual mode is enabled. The refetchOnWindowFocus option adds a window focus event listener that persists until manually removed.
