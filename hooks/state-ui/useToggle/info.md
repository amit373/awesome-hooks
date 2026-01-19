# useToggle

## Explanation
A simple but essential hook to manage boolean state. It provides a function to toggle the state between true and false, or explicitly set it. Useful for modals, menus, switches, and accordions.

## Usage

### React
```tsx
const [isModalOpen, toggleModal] = useToggle(false);
// toggleModal() -> toggles
// toggleModal(true) -> sets to true
```

### Angular
```typescript
constructor(public toggleService: ToggleService) {}
// <button (click)="toggleService.toggle()">Toggle</button>
// <div *ngIf="toggleService.value$ | async">Content</div>
```

### Vue
```vue
<script setup>
const { value, toggle } = useToggle(false);
</script>
<!-- <button @click="toggle">Toggle</button> -->
```

💡 Quick Tip: Stop manually setting booleans!

Use #useToggle to handle open/close states cleaner and faster. It's the "Hello World" of custom hooks but saves lines of code every single day.

Use cases:
✅ Modals
✅ Mobile menus
✅ Checkbox logic

React snippet:
```tsx
const [isOn, toggle] = useToggle(false);
// toggle() -> true, toggle(false) -> false
```

Keep your component logic clean! ✨

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/state-ui/useToggle


#javascript #typescript #webdevelopment #react #vue
