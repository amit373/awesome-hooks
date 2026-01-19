# useDragDrop

## Explanation
Simplifies native HTML5 Drag and Drop API. Handles data transfer and event prevention boilerplate.

## Usage

### React
```tsx
const { onDragStart, onDrop } = useDragDrop();
// <div draggable onDragStart={(e) => onDragStart(e, { id: 1 })}>Drag Me</div>
// <div onDragOver={onDragOver} onDrop={(e) => onDrop(e, handleDrop)}>Drop Here</div>
```

### Angular
```typescript
onDragStart(e) { this.ddService.onDragStart(e, { id: 1 }); }
onDrop(e) { const data = this.ddService.onDrop(e); }
```

### Vue
```vue
<script setup>
const { onDragStart, onDrop } = useDragDrop();
</script>
<!-- <div draggable @dragstart="e => onDragStart(e, item)">...</div> -->
```

📦 Drag, Drop, Done with #useDragDrop

HTML5 Drag & Drop API is verbose. This hook makes it declarative and type-safe.

React snippet:
```tsx
const { onDragStart, onDrop } = useDragDrop();

return (
  <>
    <div draggable onDragStart={e => onDragStart(e, item)}>Item</div>
    <div onDrop={e => onDrop(e, moveItem)}>Zone</div>
  </>
);
```

Build Trello clones in minutes. 📋

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/animation/useDragDrop


#react #draganddrop #frontend #webdev
