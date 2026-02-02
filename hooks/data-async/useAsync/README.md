# useAsync

A React, Vue, and Angular hook/composable/service for handling asynchronous operations with loading states, error handling, and manual execution control.

## Features

- Handle async operations with loading/error states
- Manual execution of promises
- Reset state functionality
- Cleanup to prevent memory leaks
- Identical API across React, Vue, and Angular

## Installation

```bash
# React
npm install @myhooks/useAsync/react

# Vue
npm install @myhooks/useAsync/vue

# Angular
npm install @myhooks/useAsync/angular
```

## Usage

### React

```tsx
import React from 'react';
import { useAsync } from '@myhooks/useAsync/react';

const MyComponent = () => {
  const { data, loading, error, run, reset } = useAsync(() => fetch('/api/data').then(res => res.json()), []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => run(fetch('/api/data').then(res => res.json()))}>
        Refresh
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default MyComponent;
```

### Vue

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <h1>Data:</h1>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      <button @click="run(fetch('/api/data').then(res => res.json()))">Refresh</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAsync } from '@myhooks/useAsync/vue';

const { data, loading, error, run, reset } = useAsync(() => fetch('/api/data').then(res => res.json()));
</script>
```

### Angular

```typescript
import { Component, OnInit } from '@angular/core';
import { useAsync } from '@myhooks/useAsync/angular';

@Component({
  selector: 'app-my-component',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error: {{ error.message }}</div>
    <div *ngIf="!loading && !error">
      <h1>Data:</h1>
      <pre>{{ data | json }}</pre>
      <button (click)="run(fetch('/api/data').then(res => res.json()))">Refresh</button>
      <button (click)="reset()">Reset</button>
    </div>
  `
})
export class MyComponent implements OnInit {
  private hook = useAsync(() => fetch('/api/data').then(res => res.json()), []);
  data = this.hook.data;
  loading = this.hook.loading;
  error = this.hook.error;

  constructor() {}

  run = this.hook.run;
  reset = this.hook.reset;
}
```

## API

### Parameters

- `asyncFunction?`: (Optional) An asynchronous function to execute when dependencies change
- `deps?`: (Optional) Dependencies that trigger re-execution of the async function

### Return Values

- `data`: The result of the async operation
- `error`: Error object if the operation failed
- `loading`: Boolean indicating if the operation is in progress
- `run(promise)`: Function to manually execute a promise
- `reset()`: Function to reset the state

## License

MIT © Tri Hooks Team