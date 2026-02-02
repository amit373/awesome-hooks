# useDebounce

A utility hook for debouncing function calls, commonly used for search inputs, API calls, and expensive operations.

## Problem

Frequent function calls (like typing in search boxes or scrolling events) can cause performance issues and unnecessary API calls. Debouncing delays execution until the activity stops.

## When to Use

- Search input handlers
- API calls with user input
- Expensive calculations
- Scroll or resize event handlers
- Button spam protection

## API Reference

### React

```typescript
const debouncedFunction = useDebounce(callback, delay?)
```

### Vue

```typescript
const debouncedFunction = useDebounce(callback, delay?)
```

### Angular

```typescript
const debouncedFunction = useDebounce(callback, delay?)
```

**Parameters:**

- `callback` (function): Function to debounce
- `delay` (number, optional): Delay in milliseconds (default: `300`)

**Returns:**

- `debouncedFunction`: The debounced version of the input function

## Usage Examples

### React

```tsx
import { useState } from 'react';
import { useDebounce } from './hooks/data-async/useDebounce/react';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    // Simulate API call
    const response = await fetch(`/api/search?q=${searchTerm}`);
    const data = await response.json();
    setResults(data.results);
  };

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value); // This will be debounced
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import { ref } from 'vue';
import { useDebounce } from './hooks/data-async/useDebounce/vue';

const query = ref('');
const results = ref([]);

const handleSearch = async searchTerm => {
  if (!searchTerm.trim()) {
    results.value = [];
    return;
  }

  // Simulate API call
  const response = await fetch(`/api/search?q=${searchTerm}`);
  const data = await response.json();
  results.value = data.results;
};

const debouncedSearch = useDebounce(handleSearch, 500);

const handleChange = event => {
  const value = event.target.value;
  query.value = value;
  debouncedSearch(value); // This will be debounced
};
</script>

<template>
  <div>
    <input v-model="query" @input="handleChange" placeholder="Search..." />
    <ul>
      <li v-for="result in results" :key="result.id">{{ result.title }}</li>
    </ul>
  </div>
</template>
```

### Angular

```typescript
import { Component, inject } from '@angular/core';
import { useDebounce } from './hooks/data-async/useDebounce/angular';

@Component({
  selector: 'app-search-input',
  template: `
    <div>
      <input
        [(ngModel)]="query"
        (input)="handleChange($event)"
        placeholder="Search..."
      />
      <ul>
        <li *ngFor="let result of results">{{ result.title }}</li>
      </ul>
    </div>
  `,
})
export class SearchInputComponent {
  query = '';
  results: any[] = [];

  private handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      this.results = [];
      return;
    }

    // Simulate API call
    const response = await fetch(`/api/search?q=${searchTerm}`);
    const data = await response.json();
    this.results = data.results;
  };

  private debouncedSearch = useDebounce(this.handleSearch.bind(this), 500);

  handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.query = value;
    this.debouncedSearch(value); // This will be debounced
  }
}
```

## Browser Support

All modern browsers supporting ES2020+

## Edge Cases Handled

- Proper cleanup of timeouts on component unmount
- Prevents memory leaks from pending timeouts
- Handles rapid successive calls correctly
- SSR-safe implementation

## Cleanup Guarantees

- React: useEffect cleanup removes pending timeouts
- Vue: onUnmounted cleanup removes pending timeouts
- Angular: DestroyRef cleanup removes pending timeouts

## Angular Implementation Details

Uses Angular's DestroyRef for proper cleanup when the component is destroyed, preventing memory leaks from pending timeouts.
