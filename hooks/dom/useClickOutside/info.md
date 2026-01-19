# useClickOutside

## Explanation
Detects clicks outside of a specified element. Crucial for closing modals, dropdowns, and menus when the user clicks elsewhere.

## Usage

### React
```tsx
const ref = useRef(null);
useClickOutside(ref, () => setIsOpen(false));
// <div ref={ref}>Menu</div>
```

### Angular
```html
<div (clickOutside)="closeMenu()">Menu</div>
```

### Vue
```vue
<script setup>
const menuRef = ref(null);
useClickOutside(menuRef, () => isOpen.value = false);
</script>
<!-- <div ref="menuRef">Menu</div> -->
```

🖱️ Close it up with #useClickOutside

Modals that don't close when you click away are frustrating. Fix it instantly.

React snippet:
```tsx
const modalRef = useRef(null);
useClickOutside(modalRef, () => onClose());

return (
  <div className="overlay">
    <div ref={modalRef} className="modal">Content</div>
  </div>
);
```

Better UX, happier users. 😊

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/dom/useClickOutside


#ux #ui #react #frontend
