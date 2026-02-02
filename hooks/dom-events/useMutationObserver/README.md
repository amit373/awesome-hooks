# useMutationObserver

A React, Vue, and Angular hook/service that wraps the native MutationObserver API, allowing you to efficiently observe changes in the DOM. Perfect for detecting DOM modifications, tracking element changes, or responding to dynamic content updates.

## Features

- **Efficient DOM observation**: Monitors DOM changes without constant polling
- **Cross-framework support**: Available for React, Vue 3, and Angular
- **Tree-shakable**: Only import what you need
- **SSR-friendly**: Safe to use in server-side rendered applications
- **Full API compatibility**: Supports all MutationObserver options
- **Cleanup handling**: Automatic cleanup when components are unmounted

## Installation

```bash
npm install your-hooks-library
```

## Usage

### React
```tsx
import { useEffect, useRef } from 'react';
import { useMutationObserver } from 'your-hooks-library/react';

function MyComponent() {
  const targetRef = useRef<HTMLDivElement>(null);
  const mutationsRef = useRef<MutationRecord[]>([]);

  const { observe, disconnect, isSupported } = useMutationObserver(
    (mutations) => {
      mutationsRef.current = mutations;
      console.log('DOM mutations detected:', mutations);
    },
    { childList: true, subtree: true, attributes: true }
  );

  useEffect(() => {
    if (targetRef.current) {
      observe(targetRef.current);
    }

    return () => {
      disconnect();
    };
  }, [observe, disconnect]);

  if (!isSupported) {
    return <div>MutationObserver not supported</div>;
  }

  return (
    <div ref={targetRef}>
      <p>Watch this container for changes</p>
      {/* Content that might change dynamically */}
    </div>
  );
}
```

### Vue 3
```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useMutationObserver } from 'your-hooks-library/vue';

const targetEl = ref(null);
const mutations = ref([]);

const { observe, disconnect, isSupported } = useMutationObserver(
  (mutationRecords) => {
    mutations.value = mutationRecords;
    console.log('DOM mutations detected:', mutationRecords);
  },
  { childList: true, subtree: true, attributes: true }
);

onMounted(() => {
  if (targetEl.value) {
    observe(targetEl.value);
  }
});

onUnmounted(() => {
  disconnect();
});
</script>

<template>
  <div v-if="!isSupported">MutationObserver not supported</div>
  <div v-else ref="targetEl">
    <p>Watch this container for changes</p>
    <!-- Content that might change dynamically -->
  </div>
</template>
```

### Angular
```typescript
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MutationObserverService } from 'your-hooks-library/angular';

@Component({
  template: `
    <div #targetEl *ngIf="isSupported">
      <p>Watch this container for changes</p>
      <!-- Content that might change dynamically -->
    </div>
    <div *ngIf="!isSupported">
      MutationObserver not supported
    </div>
  `
})
export class MyComponent implements OnInit, OnDestroy {
  @ViewChild('targetEl', { static: false }) targetEl!: ElementRef;
  
  isSupported = false;
  private observeFn!: (target: Node) => void;
  private disconnectFn!: () => void;

  constructor(private mutationObserverService: MutationObserverService) {}

  ngOnInit() {
    const result = this.mutationObserverService.useMutationObserver(
      (mutations) => {
        console.log('DOM mutations detected:', mutations);
      },
      { childList: true, subtree: true, attributes: true }
    );
    
    this.isSupported = result.isSupported;
    this.observeFn = result.observe;
    this.disconnectFn = result.disconnect;

    if (this.targetEl && this.isSupported) {
      this.observeFn(this.targetEl.nativeElement);
    }
  }

  ngOnDestroy() {
    this.disconnectFn();
  }
}
```

## API

### Parameters

- `callback` (MutationCallback): Function called when mutations are observed
- `options` (MutationObserverInit, optional): Configuration object with:
  - `childList` (boolean): Observe direct child additions/removals
  - `subtree` (boolean): Observe changes in the entire subtree
  - `attributes` (boolean): Observe attribute changes
  - `attributeFilter` (string[]): Specific attributes to observe
  - `characterData` (boolean): Observe character data changes
  - More options available per the MutationObserver specification

### Return Value

Returns an object with:

- `isSupported` (boolean): Whether MutationObserver is supported in the current environment
- `observe(target, options?)`: Method to start observing a DOM node
- `disconnect()`: Method to stop observing and clean up
- `takeRecords()`: Method to retrieve pending mutation records

## Browser Compatibility

- Chrome 26+
- Firefox 14+
- Safari 7+
- Edge 12+

## License

MIT